import json
import datetime

from django.contrib.auth.models import User
from django.conf import settings
from django.utils.timezone import now
from django.db import models
from django.core.serializers.json import DjangoJSONEncoder
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy as _

from rest_framework_api_key.models import AbstractAPIKey
from rest_framework_api_key.models import BaseAPIKeyManager
from rest_framework_api_key.crypto import KeyGenerator

from mptt.models import MPTTModel, TreeForeignKey

User = settings.AUTH_USER_MODEL

class CustomPermissionWithoutContentType(models.Model):
            
    class Meta:
        
        managed = False  # No database table creation or deletion  \
                         # operations will be performed for this model. 
                
        default_permissions = () # disable "add", "change", "delete"
                                 # and "view" default permissions

        permissions = ( 
            ('allow_chat', 'Global permission for chatroom'),  
            ('allow_agent', 'Global permission for using agent'), 
            ('allow_toolbox', 'Global permission for using toolbox'), 
            ('allow_view_log', 'Global permission for viewing log'),
            ('allow_chat_api', 'Global permission for chat api'),  
            ('allow_agent_api', 'Global permission for using agent api'), 
            ('allow_toolbox_api', 'Global permission for using toolbox api'), 
            ('allow_view_cost', 'Global permission for viewing cost'),
            ('allow_create_template', 'Global permission for creating template'),
            ('allow_data_synthesis', 'Global permission for using data synthesis'),
            ('allow_create_token', 'Global permission for creating token'),
            ('allow_create_dataset', 'Global permission for creating dataset')
        )

class APIKEY(AbstractAPIKey):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    credit = models.FloatField(default=0.0) 
    monero_credit = models.FloatField(default=0.0) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    integrated_address = models.TextField(max_length=400)
    payment_id = models.TextField(max_length=400)
    class Meta:
        verbose_name = 'Master API Key'
        verbose_name_plural = 'Master API Keys'
        
class FineGrainAPIKeyManager(BaseAPIKeyManager):
    key_generator = KeyGenerator(prefix_length=8, secret_key_length=64)

class FineGrainAPIKEY(AbstractAPIKey):
    objects = FineGrainAPIKeyManager()
    master_key = models.ForeignKey(APIKEY, null=True ,on_delete=models.CASCADE) #the APIKEY that create FineGrainAPIKey
    user = models.OneToOneField(User, null=True ,on_delete=models.CASCADE) # the dummy account for the FineGrainAPIKEY 
    created_at = models.DateTimeField(auto_now_add=True)
    ttl = models.DurationField(default=datetime.timedelta(days=10), null=True)
    first_three_char = models.TextField(default="???")
    last_three_char = models.TextField(default="???")
    class Meta:
        verbose_name = 'FineGrain API Key'
        verbose_name_plural = 'FineGrain API Keys'

class Crypto(models.Model):
    coin = models.TextField()
    address = models.TextField()
    balance = models.FloatField(default=0.0)
    coin_usd_rate= models.FloatField(default=0.0)
    def __str__(self) -> str:
        return self.coin

class Dataset(models.Model):
    name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return self.name + " " + self.created_at

class DatasetRecord(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    system_prompt = models.TextField()
    prompt = models.TextField(max_length=128000, blank=True, null=True)
    response = models.TextField(max_length=128000, blank=True, null=True)
    evaluation = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return self.dataset.name + " " + self.created_at
    
class PaymentHistory(models.Model):
    key =  models.ForeignKey(APIKEY, on_delete=models.CASCADE) 
    crypto  =  models.ForeignKey(Crypto, on_delete=models.CASCADE) 
    amount = models.FloatField(default=0.0)
    integrated_address = models.CharField(max_length=400)
    payment_id = models.CharField(max_length=400)
    transaction_hash = models.CharField(max_length=400)
    locked = models.BooleanField()
    block_height = models.IntegerField(default=0)
    def __str__(self) -> str:
        return str(self.amount)

class LLM(models.Model):
    name = models.CharField(max_length=255)
    base = models.CharField(max_length=255, blank=True, null=True)
    size =  models.IntegerField(default=1)
    desc = models.TextField()
    chat_template = models.TextField(default="")
    input_price = models.FloatField(default=0.0)
    output_price = models.FloatField(default=0.0)
    agent_availability = models.BooleanField(default=False)
    is_self_host = models.BooleanField(default=True)
    context_length = models.IntegerField(default=8192)
    max_history_length = models.IntegerField(default=0)
    def __str__(self) -> str:
        return self.name

class InferenceServer(models.Model):
    name = models.CharField(max_length=255)
    instance_type = models.CharField(max_length=255)
    url = models.URLField(max_length = 255) 
    alternative_url = models.URLField(max_length = 255)
    hosted_model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    public_ip = models.GenericIPAddressField()
    private_ip = models.GenericIPAddressField()
    status = models.CharField(max_length = 255, default="off")
    last_message_time = models.DateTimeField(default=now)
    availability = models.CharField(max_length = 255, default="Not Available")
    def __str__(self) -> str:
        return self.name
        
class ProductTag(models.Model):
    name = models.CharField(
        max_length=100, help_text=_("Designates the name of the tag.")
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name
        
class PromptResponse(models.Model):
    prompt = models.TextField()
    response = models.TextField()
    model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    key = models.ForeignKey(APIKEY, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    p_type = models.CharField(max_length=255, default="prompt")
    input_cost = models.FloatField(default=0.0)
    output_cost = models.FloatField(default=0.0)
    number_input_tokens = models.IntegerField(default=0)
    number_output_tokens = models.IntegerField(default=0)
    class Meta:
        ordering = ("-created_at",)
    def __str__(self) -> str:
        return self.prompt
    def get_vectordb_text(self):
        return f"{self.prompt} -- {self.response}"
    def get_vectordb_metadata(self):
        return {"key":self.key.hashed_key,
                "key_name": self.key.name,
                "p_type": self.p_type, 
                "input_cost": self.input_cost,
                "output_cost":self.output_cost,
                "model": self.model.name, 
                "created_at": json.dumps(self.created_at, cls=DjangoJSONEncoder)}

class Product(models.Model):
    name = models.CharField(max_length=255)
    tags = models.ManyToManyField(ProductTag, blank=True)
    desc = models.TextField(_("Description"), blank=True)
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name

class Price(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return f"{self.product.name} {self.price}"

class MemoryTree(MPTTModel):
    name = models.CharField(max_length=255, unique=True)
    prompt = models.TextField()
    response = models.TextField()
    model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    key = models.ForeignKey(APIKEY, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    p_type = models.CharField(max_length=255, default="prompt")
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    is_session_start_node = models.BooleanField(default=False)
    def __str__(self) -> str:
        return f"{self.name}"
    
    class MPTTMeta:
        order_insertion_by = ['created_at']

class InstructionTree(MPTTModel):
    name = models.CharField(max_length=255, unique=True)
    code = models.TextField()
    instruct = models.TextField(default="")
    default_child = models.BooleanField(default=False)
    default_editor_template = models.TextField(default="")
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    def __str__(self) -> str:
        return f"{self.name}"
    class MPTTMeta:
        order_insertion_by = ['code']
    
class UserInstructionTree(MPTTModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    displayed_name = models.TextField(default='')
    code = models.TextField(default="")
    instruct = models.TextField(default="", max_length=128000)
    default_child = models.BooleanField(default=False)
    default_editor_template = models.TextField(default="")
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    def __str__(self) -> str:
        return f"{self.name}"
    class MPTTMeta:
        order_insertion_by = ['code']
    