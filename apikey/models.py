from django.conf import settings
from django.utils.timezone import now
from django.db import models
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy as _
from rest_framework_api_key.models import AbstractAPIKey
from tinymce.models import HTMLField

from mptt.models import MPTTModel, TreeForeignKey
User = settings.AUTH_USER_MODEL



class Article(models.Model):
    name = models.CharField(max_length=200)
    a_type = models.CharField(max_length=200)
    content = HTMLField() 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self) -> str:
        return f"{self.name} - {self.a_type} - {self.updated_at}"

def get_image_filename(instance, filename):
    name = instance.name
    slug = slugify(name)
    return f"products/{slug}-{filename}"
    
class APIKEY(AbstractAPIKey):
    credit = models.FloatField(default=0.0) 
    monero_credit = models.FloatField(default=0.0) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    integrated_address = models.CharField(max_length=400)
    payment_id = models.CharField(max_length=400)

class Crypto(models.Model):
    coin = models.CharField(max_length=200)
    address = models.CharField(max_length=400)
    balance = models.FloatField(default=0.0)
    coin_usd_rate= models.FloatField(default=0.0)
    def __str__(self) -> str:
        return self.coin

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
    name = models.CharField(max_length=200)
    size =  models.IntegerField(default=1)
    desc = models.TextField()
    chat_template = models.TextField(default="")
    price = models.FloatField(default=0.0)
    agent_availability = models.BooleanField(default=False)
    def __str__(self) -> str:
        return self.name
    
class CustomTemplate(models.Model):
    template_name = models.CharField(max_length=300)
    model = models.ManyToManyField(LLM)
    template = models.TextField(default="")
    bot_instruct = models.TextField(default="")
    def __str__(self) -> str:
        return self.template_name

class AgentInstruct(models.Model):
    name = models.CharField(max_length=200)
    template = models.ForeignKey(CustomTemplate, on_delete=models.CASCADE)
    code = models.CharField(max_length=10)
    instruct = models.TextField(default="")
    default = models.BooleanField(default=False)
    def __str__(self) -> str:
        return f"{self.name} - {self.template.template_name}"

class InferenceServer(models.Model):
    name = models.CharField(max_length=200)
    instance_type = models.CharField(max_length=200)
    url = models.URLField(max_length = 200) 
    alternative_url = models.URLField(max_length = 200)
    hosted_model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    public_ip = models.GenericIPAddressField()
    private_ip = models.GenericIPAddressField()
    status = models.CharField(max_length = 200, default="off")
    last_message_time = models.DateTimeField(default=now)
    availability = models.CharField(max_length = 200, default="Not Available")
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
    prompt = models.CharField(max_length=4096)
    response = models.CharField(max_length=4096)
    model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    key = models.ForeignKey(APIKEY, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    p_type = models.CharField(max_length=4096, default="prompt")
    cost = models.FloatField(default=0.0)
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
                "cost": self.cost,
                "model": self.model.name, 
                "created_at": json.dumps(self.created_at, cls=DjangoJSONEncoder)}

class Product(models.Model):
    name = models.CharField(max_length=200)
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
    name = models.CharField(max_length=200, unique=True)
    prompt = models.CharField(max_length=4096)
    response = models.CharField(max_length=4096)
    model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    key = models.ForeignKey(APIKEY, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    p_type = models.CharField(max_length=4096, default="prompt")
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    is_session_start_node = models.BooleanField(default=False)
    def __str__(self) -> str:
        return f"{self.name}"
    
    class MPTTMeta:
        order_insertion_by = ['name']
