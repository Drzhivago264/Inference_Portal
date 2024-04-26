from rest_framework import serializers
from .models import Article, LLM, InferenceServer

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('name', 'a_type','content')

class RedirectSerializer(serializers.Serializer):
   key = serializers.CharField()
   destination = serializers.CharField()

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
