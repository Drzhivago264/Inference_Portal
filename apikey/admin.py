
from rest_framework_api_key.admin import APIKeyModelAdmin
from .models import APIKEY
from django.contrib import admin
from .models import (Price,
                     Product,
                     ProductTag,
                     LLM,
                     InferenceServer,
                     PromptResponse,
                     APIKEY,
                     Crypto,
                     PaymentHistory,
                     MemoryTree,
                     InstructionTree,
                     Article)
from mptt.admin import DraggableMPTTAdmin


class PriceAdmin(admin.StackedInline):
    model = Price


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = (PriceAdmin,)

    class Meta:
        model = Product


@admin.register(APIKEY)
class APIKEYModelAdmin(APIKeyModelAdmin):
    pass


admin.site.register(ProductTag)
admin.site.register(Price)
admin.site.register(Crypto)
admin.site.register(PaymentHistory)
admin.site.register(LLM)
admin.site.register(InferenceServer)
admin.site.register(PromptResponse)
admin.site.register(Article)

admin.site.register(MemoryTree, DraggableMPTTAdmin, list_display=(
    'tree_actions',
    'indented_title',
    ),
        list_display_links=(
            'indented_title',
    ),
)
admin.site.register(InstructionTree, DraggableMPTTAdmin, list_display=(
    'tree_actions',
    'indented_title',
    ),
        list_display_links=(
            'indented_title',
    ),
)
