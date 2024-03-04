
from django.contrib import admin

from .models import Price, Product, ProductTag, LLM, InferenceServer, PromptResponse, CustomTemplate, APIKEY

class PriceAdmin(admin.StackedInline):
    model = Price

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = (PriceAdmin,)

    class Meta:
        model = Product

from rest_framework_api_key.admin import APIKeyModelAdmin
from .models import APIKEY

@admin.register(APIKEY)
class APIKEYModelAdmin(APIKeyModelAdmin):
    pass

admin.site.register(ProductTag)
admin.site.register(Price)
admin.site.register(LLM)
admin.site.register(CustomTemplate)
admin.site.register(InferenceServer)
admin.site.register(PromptResponse)
