from rest_framework import serializers
from .models import Article, LLM, InferenceServer, Product

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('name', 'a_type','content')

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
        fields = ('id', 'name', 'desc','price')

class ServerSerializer(serializers.ModelSerializer):
    model_name = serializers.SerializerMethodField()
    model_price = serializers.SerializerMethodField()
    class Meta:
        model = InferenceServer
        fields = ('id', 'status', 'availability', 'model_name', 'model_price')
    def get_model_name(self, instance):
            return instance.hosted_model.name if instance.hosted_model else ''
    def get_model_price(self, instance):
            return instance.hosted_model.price if instance.hosted_model else ''
