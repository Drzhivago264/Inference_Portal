from django.shortcuts import render
from server.models import (
    LLM,
    InferenceServer,
    Article,
)
from rest_framework import viewsets
from server.serializer import (ArticleSerializer, 
                               ModelSerializer, 
                               ServerSerializer)
 
from django.http import HttpResponse
from django.http import (
    HttpRequest,
    HttpResponse,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def article_api(request, name, a_type):
    page_content = Article.objects.get(name=name, a_type=a_type)
    serializer = ArticleSerializer(page_content)
    return Response({'article': serializer.data})

@api_view(['GET'])
def model_api(request):
    servers = InferenceServer.objects.all().defer('name').order_by("hosted_model")
    models =  LLM.objects.filter(agent_availability=False)
    serializer_server = ServerSerializer(servers, many=True)
    serializer_model = ModelSerializer(models, many=True )
    return Response({"servers": serializer_server.data, "models": serializer_model.data})

# @cache_page(60*15)
def index(request: HttpRequest) -> HttpResponse:
    page_content = Article.objects.filter(name="index")
    context = {"title": "Inference",
               "content_list": page_content, }
    return render(request, "html/index.html", context=context)


# @cache_page(60*15)
def manual(request: HttpRequest) -> HttpResponse:
    page_content = Article.objects.filter(name='manual')
    context = {
        "content_list": page_content,
        "title": "Manual"
    }
    return render(request, "html/manual.html", context=context)


# @cache_page(60)
def model_infor(request: HttpRequest) -> HttpResponse:
    llm = LLM.objects.filter(agent_availability=False)
    servers = InferenceServer.objects.all().defer('name').order_by("hosted_model")
    context = {'llms': llm, 'servers': servers, 'title': 'Model Detail'}
    return render(request, "html/model_infor.html", context)


def frankenstein(request: HttpRequest) -> HttpResponse:
    return render(request, "html/frankenstein.html", {"title": "Frankenstein"})


def handler_403(request: HttpRequest, exception: None = None) -> HttpResponse:
    return render(request, 'error_html/403.html', status=403)


def handler_404(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, 'error_html/404.html', status=404)


def handler_500(request: HttpRequest,  *args, **argv) -> HttpResponse:
    return render(request, 'error_html/500.html', status=500)


def handler_429(request: HttpRequest, exception: None) -> HttpResponse:
    return render(request, 'error_html/429.html', status=429)
