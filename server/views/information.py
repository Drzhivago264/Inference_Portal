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
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

"""--------REACT FRONTEND API---------"""
@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def article_api(request: HttpRequest, name: str, a_type: str) -> Response:
    page_content = Article.objects.get(name=name, a_type=a_type)
    serializer = ArticleSerializer(page_content)
    return Response({'article': serializer.data})

@api_view(['GET'])
@throttle_classes([AnonRateThrottle]) 
def model_api(request: HttpRequest) -> Response:
    servers = InferenceServer.objects.all().defer('name').order_by("hosted_model")
    models_charoom = LLM.objects.all()
    models_display = [i for i in models_charoom if not i.agent_availability] 
    models_agent =  [i for i in models_charoom if i.agent_availability] 
    serializer_server = ServerSerializer(servers, many=True)
    serializer_model_display = ModelSerializer(models_display, many=True )
    serializer_model_agent = ModelSerializer(models_agent, many=True )
    return Response({"servers": serializer_server.data,
                      "models": serializer_model_display.data, 
                      'models_agent': serializer_model_agent.data
                      })


"""--------OLD VIEW FOR DJANGO TEMPLATE---------"""
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
