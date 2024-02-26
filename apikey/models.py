from django.conf import settings
from django.utils.timezone import now
from django.db import models
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy as _
from django_bleach.models import BleachField
User = settings.AUTH_USER_MODEL

def get_image_filename(instance, filename):
    name = instance.name
    slug = slugify(name)
    return f"products/{slug}-{filename}"
    
class LLM(models.Model):
    name = models.CharField(max_length=200)
    size =  models.IntegerField(default=1)
    desc = models.TextField()
    chat_template = models.TextField(default="")
    price = models.FloatField(default=0.0)
    
    def __str__(self) -> str:
        return self.name
    
class CustomTemplate(models.Model):
    template_name = models.CharField(max_length=300)
    model = models.ManyToManyField(LLM)
    template = models.TextField(default="")
    bot_instruct = models.TextField(default="")
    def __str__(self) -> str:
        return self.template_name
    
class InferenceServer(models.Model):
    name = models.CharField(max_length=200)
    instance_type = models.CharField(max_length=200)
    url = models.URLField(max_length = 200) 
    hosted_model = models.ForeignKey(LLM, on_delete=models.CASCADE)
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
        
class Key(models.Model):
    owner = BleachField(max_length=400)
    key =  models.CharField(max_length=400)
    credit = models.FloatField(default=0.0) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ("-created_at",)
    def __str__(self) -> str:
        return self.owner
    
class PromptResponse(models.Model):
    prompt = models.CharField(max_length=4048)
    response = models.CharField(max_length=4048)
    model = models.ForeignKey(LLM, on_delete=models.CASCADE)
    key = models.ForeignKey(Key, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    p_type = models.TextField(default="prompt")
    class Meta:
        ordering = ("-created_at",)
        
    def __str__(self) -> str:
        return self.prompt
        
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
