from rest_framework import serializers
from server.utils import constant
from server.models import (
    LLM,
    InferenceServer,
    Product,
    InstructionTree,
    MemoryTree,
    UserInstructionTree,
    PromptResponse,
    Dataset,
    DatasetRecord

)
from server.utils import constant


class CostSerializer(serializers.ModelSerializer):
    model = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = PromptResponse
        fields = ("number_input_tokens", "number_output_tokens",
                  "created_at", "model", "p_type")


class InstructionTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructionTree
        fields = ('instruct', "name", "code", "default_editor_template")


class DatasetCreateSerializer(serializers.Serializer):
    name = serializers.CharField()

class DatasetDeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField()

class DatasetUpdateSerializer(DatasetDeleteSerializer):
    new_name = serializers.CharField()

class DatasetGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ('id', "name")

class DatasetRecordGetSerialzier(serializers.Serializer):
    id = serializers.IntegerField()
    system_prompt = serializers.CharField()
    prompt = serializers.CharField()
    response = serializers.CharField()
    evaluation = serializers.JSONField()

class DatasetRecordSerialzier(serializers.Serializer):
    record_id = serializers.IntegerField(required=False)
    dataset_id = serializers.IntegerField()
    system_prompt = serializers.CharField()
    prompt = serializers.CharField()
    response = serializers.CharField()
    evaluation = serializers.JSONField()

class DatasetDeleteRecordSerialzier(serializers.Serializer):
    record_id = serializers.IntegerField()
    dataset_id = serializers.IntegerField()

class UserInstructionTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInstructionTree
        fields = ('instruct', "displayed_name", "name",
                  "code", "default_editor_template")


class MemoryTreeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = MemoryTree
        fields = ('id', 'prompt', 'response', 'p_type',
                  'created_at', 'level', 'children', 'parent')
    # Return None for lazy loading from the frontend

    def get_children(self, instance):
        return None


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'id')


class UserInstructionGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInstructionTree
        fields = ('id', 'name', 'displayed_name', 'code',
                  'parent', 'level', 'children', 'instruct')

    def get_fields(self):
        fields = super(UserInstructionGetSerializer, self).get_fields()
        fields['children'] = UserInstructionGetSerializer(
            many=True, required=False)
        return fields


class LoginSerializer(serializers.Serializer):
    key = serializers.CharField()

    def validate_key(self, value):
        if len(value) != 41 and len(value) != 73 and len(value) != 0:
            raise serializers.ValidationError(
                "Key is incorrect")
        return value


class RedirectSerializer(LoginSerializer):
    check_login = serializers.BooleanField()
    key = serializers.CharField(required=False, allow_blank=True)
    destination = serializers.CharField()


class CreateKeySerializer(serializers.Serializer):
    key_name = serializers.CharField()

    def validate_key_name(self, value):
        if len(value) > constant.MAX_KEY_NAME_LENGTH:
            raise serializers.ValidationError(
                f"Key name is too long, keep it below {constant.MAX_KEY_NAME_LENGTH} characters")
        return value


class PermissionSerializer(serializers.Serializer):
    allow_chat = serializers.BooleanField()
    allow_agent = serializers.BooleanField()
    allow_chat_api = serializers.BooleanField()
    allow_agent_api = serializers.BooleanField()
    allow_toolbox = serializers.BooleanField()
    allow_toolbox_api = serializers.BooleanField()
    allow_view_log = serializers.BooleanField()
    allow_view_cost = serializers.BooleanField()
    allow_create_template = serializers.BooleanField()
    allow_data_synthesis = serializers.BooleanField()


class CreateTokenSerializer(serializers.Serializer):
    token_name = serializers.CharField()
    use_ttl = serializers.BooleanField()
    ttl = serializers.IntegerField()
    time_unit = serializers.CharField()
    permission = PermissionSerializer()

    def validate_token_name(self, value):
        if len(value) > constant.MAX_KEY_NAME_LENGTH:
            raise serializers.ValidationError(
                f"Token name is too long, keep it below {constant.MAX_KEY_NAME_LENGTH} characters")
        return value

    def validate_ttl(self, value):
        if value <= 0 or value > 999999:
            raise serializers.ValidationError(
                "Time to live cannot be negative or larger than 999999")
        return value

    def validate_time_unit(self, value):
        if value not in ['day', 'hour', 'minute', 'second']:
            raise serializers.ValidationError("Time format is incorrect")
        return value


class ModifyTokenSerializer(serializers.Serializer):
    token_name = serializers.CharField()
    prefix = serializers.CharField()
    first_and_last_char = serializers.CharField()
    permission = serializers.CharField(required=False)

    def validate_permission(self, value):
        if value and value not in constant.DEFAULT_PERMISSION_CODENAMES:
            raise serializers.ValidationError("Cannot find permission")
        return value


class CheckKeySerializer(CreateKeySerializer):
    key = serializers.CharField()


class SendMailSerializer(CheckKeySerializer):
    message = serializers.CharField()
    username = serializers.CharField()
    mail = serializers.CharField()


class StripePaymentSerializer(CheckKeySerializer):
    product_id = serializers.CharField()


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LLM
        fields = ('id', 'name', 'desc', 'input_price',
                  'output_price', 'context_length')


class ServerSerializer(serializers.ModelSerializer):
    model_name = serializers.SerializerMethodField()
    model_price_input = serializers.SerializerMethodField()
    model_price_output = serializers.SerializerMethodField()

    class Meta:
        model = InferenceServer
        fields = ('id', 'status', 'availability', 'model_name',
                  'model_price_input', 'model_price_output')

    def get_model_name(self, instance):
        return instance.hosted_model.name if instance.hosted_model else ''

    def get_model_price_input(self, instance):
        return instance.hosted_model.input_price if instance.hosted_model else ''

    def get_model_price_output(self, instance):
        return instance.hosted_model.output_price if instance.hosted_model else ''


class UserInstructionCreateSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False, allow_null=True)
    displayed_name = serializers.CharField(required=False, allow_null=True)
    instruct = serializers.CharField(required=False, allow_null=True)


class NestedUserInstructionCreateSerializer(serializers.Serializer):
    parent_instruction = UserInstructionCreateSerializer(
        required=False, allow_null=True)
    childrens = UserInstructionCreateSerializer(
        many=True, required=False, allow_null=True)


class UserInstructionDeleteCreateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
