from django.contrib import admin
from rest_framework_api_key.admin import APIKeyModelAdmin
from treebeard.admin import TreeAdmin
from treebeard.forms import movenodeform_factory

from server.models.api_key import APIKEY, FineGrainAPIKEY
from server.models.dataset import Dataset, EmbeddingDatasetRecord
from server.models.instruction import InstructionTreeMP, UserInstructionTreeMP
from server.models.llm_server import LLM, InferenceServer
from server.models.log import MemoryTreeMP, PromptResponse
from server.models.product import Crypto, PaymentHistory, Price, Product


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


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    model = Price
    list_display = ("product", "price", "created_at", "updated_at")
    list_editable = ("price",)
    list_display_links = ("product",)


@admin.register(Crypto)
class CryptoAdmin(admin.ModelAdmin):
    model = Crypto
    list_display = ("coin", "address", "balance", "coin_usd_rate")
    list_editable = ("address", "balance", "coin_usd_rate")
    list_display_links = ("coin",)


@admin.register(LLM)
class LLMAdmin(admin.ModelAdmin):
    model = LLM
    list_display = (
        "name",
        "desc",
        "input_price",
        "output_price",
        "agent_availability",
        "is_self_host",
        "context_length",
        "max_history_length",
    )
    list_editable = (
        "desc",
        "input_price",
        "output_price",
        "agent_availability",
        "is_self_host",
        "context_length",
        "max_history_length",
    )
    list_display_links = ("name",)


@admin.register(Dataset)
class DatasetAdmin(admin.ModelAdmin):
    model = Dataset
    list_display = (
        "name",
        "user",
        "default_system_prompt",
        "default_evaluation",
        "created_at",
        "updated_at",
    )
    list_editable = ("default_system_prompt", "default_evaluation")
    list_display_links = ("name", "user")


@admin.register(EmbeddingDatasetRecord)
class EmbeddingDatasetRecordAdmin(admin.ModelAdmin):
    model = EmbeddingDatasetRecord
    list_display = (
        "dataset",
        "content",
        "evaluation",
        "created_at",
        "updated_at",
        "embedding",
    )
    list_editable = ("content", "evaluation")
    list_display_links = ("dataset",)


@admin.register(InferenceServer)
class InferenceServerAdmin(admin.ModelAdmin):
    model = InferenceServer
    list_display = (
        "name",
        "instance_type",
        "url",
        "alternative_url",
        "hosted_model",
        "public_ip",
        "private_ip",
        "status",
        "last_message_time",
        "availability",
    )
    list_editable = (
        "instance_type",
        "url",
        "alternative_url",
        "public_ip",
        "private_ip",
        "status",
        "last_message_time",
        "availability",
    )
    list_display_links = ("name", "hosted_model")


@admin.register(PromptResponse)
class PromptResponseAdmin(admin.ModelAdmin):
    model = PromptResponse
    list_display = (
        "prompt",
        "response",
        "type",
        "model",
        "key",
        "input_cost",
        "output_cost",
        "number_input_tokens",
        "number_output_tokens",
    )
    list_display_links = ("model", "key")


@admin.register(PaymentHistory)
class PaymentHistoryAdmin(admin.ModelAdmin):
    model = PaymentHistory
    list_display = (
        "key",
        "type",
        "crypto",
        "amount",
        "xmr_payment_id",
        "stripe_payment_id",
    )

    list_display_links = ("key", "crypto")


class SystemInstructionView(TreeAdmin):
    form = movenodeform_factory(InstructionTreeMP)


admin.site.register(InstructionTreeMP, SystemInstructionView)


class UserInstructionView(TreeAdmin):
    form = movenodeform_factory(UserInstructionTreeMP)


admin.site.register(UserInstructionTreeMP, UserInstructionView)
