from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin
from rest_framework_api_key.admin import APIKeyModelAdmin

from server.models.api_key import APIKEY, FineGrainAPIKEY
from server.models.dataset import Dataset, DatasetRecord
from server.models.instruction import InstructionTreeMP, UserInstructionTreeMP
from server.models.llm_server import LLM, InferenceServer
from server.models.log import MemoryTreeMP, PromptResponse
from server.models.product import Crypto, PaymentHistory, Price, Product
from treebeard.admin import TreeAdmin
from treebeard.forms import movenodeform_factory


class PriceAdmin(admin.StackedInline):
    model = Price

class TreeView(TreeAdmin):
    form = movenodeform_factory(MemoryTreeMP)

admin.site.register(MemoryTreeMP, TreeView)

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

class SystemInstructionView(TreeAdmin):
    form = movenodeform_factory(InstructionTreeMP)

class UserInstructionView(TreeAdmin):
    form = movenodeform_factory(UserInstructionTreeMP)

admin.site.register(InstructionTreeMP, SystemInstructionView)
admin.site.register(UserInstructionTreeMP, UserInstructionView)

