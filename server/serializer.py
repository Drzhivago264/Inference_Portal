from rest_framework import serializers
from .models import Article, LLM, InferenceServer, Product, InstructionTree, MemoryTree, UserInstructionTree


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('name', 'a_type', 'content')


class InstructionTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructionTree
        fields = ('instruct', "name", "code", "default_editor_template")

class MemoryTreeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    class Meta:
        model = MemoryTree
        fields=('id', 'prompt', 'response', 'p_type', 'created_at', 'level', 'children', 'parent')
    #Return None for lazy loading from the frontend
    def get_children(self, instance):
        return None

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'id')

class UserInstructionCRUDSerializer(serializers.Serializer):
    default_child = serializers.BooleanField()
    displayed_name = serializers.CharField()
    instruct = serializers.CharField()
    parent = serializers.CharField()
    code = serializers.CharField()
    default_editor_template = serializers.CharField()
    id = serializers.IntegerField()

class UserInstructionGetSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    class Meta:
        model = UserInstructionTree
        fields=('id', 'name', 'displayed_name', 'code', 'parent', 'level', 'children', 'default_child')
    #Return None for lazy loading from the frontend
    def get_children(self, instance):
        return None

class LoginSerializer(serializers.Serializer):
    key = serializers.CharField()

class RedirectSerializer(LoginSerializer):
    check_login = serializers.BooleanField()
    key = serializers.CharField(required=False, allow_blank=True )
    destination = serializers.CharField()


class CreateKeySerializer(serializers.Serializer):
    key_name = serializers.CharField()


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
        fields = ('id', 'name', 'desc', 'input_price', 'output_price')


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
