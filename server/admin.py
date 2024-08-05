from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin
from rest_framework_api_key.admin import APIKeyModelAdmin

from server.models.api_key import APIKEY, FineGrainAPIKEY
from server.models.dataset import Dataset, DatasetRecord
from server.models.instruction import InstructionTree, UserInstructionTree
from server.models.llm_server import LLM, InferenceServer
from server.models.log import MemoryTree, PromptResponse
from server.models.product import Crypto, PaymentHistory, Price, Product


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


@admin.register(FineGrainAPIKEY)
class FineGrainAPIKEYModelAdmin(APIKeyModelAdmin):
    pass


models = [
    Price,
    Crypto,
    PaymentHistory,
    LLM,
    InferenceServer,
    PromptResponse,
    DatasetRecord,
    Dataset,
]
admin.site.register(models)

admin.site.register(
    MemoryTree,
    DraggableMPTTAdmin,
    list_display=(
        "tree_actions",
        "indented_title",
    ),
    list_display_links=("indented_title",),
)
admin.site.register(
    InstructionTree,
    DraggableMPTTAdmin,
    list_display=(
        "tree_actions",
        "indented_title",
    ),
    list_display_links=("indented_title",),
)

admin.site.register(
    UserInstructionTree,
    DraggableMPTTAdmin,
    list_display=(
        "tree_actions",
        "indented_title",
    ),
    list_display_links=("indented_title",),
)
