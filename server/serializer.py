from rest_framework import serializers
from .models import Article, LLM, InferenceServer, Product, InstructionTree

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('name', 'a_type','content')

class InstructionTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstructionTree
        fields=('instruct', "name", "code", "default_editor_template")


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'id')

class RedirectSerializer(serializers.Serializer):
   key = serializers.CharField()
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
        fields = ('id', 'name', 'desc','input_price', 'output_price')

class ServerSerializer(serializers.ModelSerializer):
    model_name = serializers.SerializerMethodField()
    model_price_input = serializers.SerializerMethodField()
    model_price_output = serializers.SerializerMethodField()
    class Meta:
        model = InferenceServer
        fields = ('id', 'status', 'availability', 'model_name', 'model_price_input', 'model_price_output')
    def get_model_name(self, instance):
            return instance.hosted_model.name if instance.hosted_model else ''
    def get_model_price_input(self, instance):
            return instance.hosted_model.input_price if instance.hosted_model else ''
    def get_model_price_output(self, instance):
            return instance.hosted_model.output_price if instance.hosted_model else ''