from django.shortcuts import render
import typing
from django.db.models import QuerySet
from datetime import datetime
from server.models import (
    LLM,
    InstructionTree,
    Article,
)
from django.views.generic import ListView
from django.http import HttpResponse
from django.conf import settings
from django.contrib import messages
from server.celery_tasks import Inference
from server.util.commond_func import get_key
from django.core.cache import cache
from server.util import constant
from server.forms import (
    RoomRedirectForm,
    PromptForm,
    LogForm,
)
from django.core.signing import Signer
from hashlib import sha256
from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponseRedirect
)
from server.models import APIKEY
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.decorators import api_view, throttle_classes
from server.serializer import RedirectSerializer, InstructionTreeSerializer


@api_view(['POST'])
@throttle_classes([AnonRateThrottle])
def hub_redirect_api(request):
    serializer = RedirectSerializer(data=request.data)
    if serializer.is_valid():
        signer = Signer()
        key = serializer.data['key']
        destination = serializer.data['destination']
        try:
            APIKEY.objects.get_from_key(key)
            if destination != "log":
                key_hash = sha256(key.encode('utf-8')).hexdigest()
                return Response({"redirect_link": f"/frontend/{destination}/{key_hash}"}, status=status.HTTP_200_OK)
            else:
                return Response({"redirect_link": f"/frontend/{destination}/{signer.sign(key)}"}, status=status.HTTP_200_OK)
        except APIKEY.DoesNotExist:
                return Response({'detail': 'Your Key is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def instruction_tree_api(request):
    root_nodes = InstructionTree.objects.filter(level=0)
    serializer = InstructionTreeSerializer(root_nodes, many=True)
    for root in root_nodes:
        if root.name == "Assignment Agent":
            default_child_template = root.get_children()
            serializer_childrend = InstructionTreeSerializer(default_child_template, many=True)
    return Response({'root_nodes': serializer.data, 'default_children': serializer_childrend.data})

def agent_select(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    if request.method == "POST":
        form = RoomRedirectForm(request.POST)
        if form.is_valid():
            destination = form.cleaned_data['room']
            key = form.cleaned_data['key']
            key_hash = sha256(key.encode('utf-8')).hexdigest()
            return HttpResponseRedirect(f"/{destination}/{key_hash}")
    else:
        form = RoomRedirectForm()
        explaination = Article.objects.get(
            name="redirect", a_type="explaination")
    context = {"form": form, "title": "Inference Mode",
               "explaination": explaination}
    return render(request, "html/chat.html", context=context)


def prompt(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    llm = LLM.objects.filter(agent_availability=False)
    if request.method == "POST":
        signer = Signer()
        form = PromptForm(request.POST)
        logform = LogForm(request.POST)
        if form.is_valid():
            top_p = form.cleaned_data['top_p']
            best_of = form.cleaned_data['best_of']
            top_k = form.cleaned_data['top_k']
            if top_k <= 0:
                top_k = -1
            max_tokens = form.cleaned_data['max_tokens']

            frequency_penalty = form.cleaned_data['frequency_penalty']
            presence_penalty = form.cleaned_data['presence_penalty']
            temperature = form.cleaned_data['temperature']
            beam = form.cleaned_data['beam'] if form.cleaned_data['beam'] else False
            early_stopping = form.cleaned_data['early_stopping'] if form.cleaned_data['early_stopping'] else False
            length_penalty = form.cleaned_data['length_penalty']
            m = form.cleaned_data['model']
            mode = form.cleaned_data['mode']

            if mode == "chat":
                type_ = "prompt_room"
            elif mode == "generate":
                type_ = "prompt"

            prompt = form.cleaned_data['prompt']
            k = form.cleaned_data['key']
            n = form.cleaned_data['key_name']
            include_memory = form.cleaned_data['include_memory']
            instance = cache.get(f"{k}:{n}")
            if instance is None:
                instance = get_key(n, k)
            if not instance:
                response = "Error: key or key name is not correct"
            elif instance:
                cache.set(f"{k}:{n}", instance, constant.CACHE_AUTHENTICATION)
                Inference.delay(unique=None,
                                is_session_start_node=None,
                                mode=mode,
                                stream=False,
                                type_=type_,
                                key=str(request.POST.get('key')),
                                credit=instance.credit,
                                room_group_name=None,
                                model=m,
                                top_k=top_k,
                                top_p=top_p,
                                best_of=best_of,
                                temperature=temperature,
                                max_tokens=max_tokens,
                                presence_penalty=presence_penalty,
                                frequency_penalty=frequency_penalty,
                                length_penalty=length_penalty,
                                early_stopping=early_stopping,
                                beam=beam,
                                prompt=prompt,
                                include_memory=include_memory)
                response = "Your prompt is queued, refer to Prompt-Response Log for detail"
            messages.info(
                request, f"{response} ({m} {datetime.today().strftime('%Y-%m-%d %H:%M:%S')})")
            return HttpResponseRedirect("/prompt")
        elif logform.is_valid():
            key = logform.cleaned_data['key_']
            name = logform.cleaned_data['key_name']
            check = get_key(key=key, name=name)
            if check:
                return HttpResponseRedirect(f"/prompt/{signer.sign(key)}")
            else:
                messages.error(
                    request, "Error: Key or/and Key Name is/are incorrent.",  extra_tags='credit')
                return HttpResponseRedirect("/promptresponse")
        else:
            messages.info(
                request, "Error: Invalid Captcha.")
            return HttpResponseRedirect("/prompt")
    else:
        response = f"Default to Mistral Chat 13B"
        messages.info(
            request, f"{response} (Server {datetime.today().strftime('%Y-%m-%d %H:%M:%S')})")
        context = {
            "llms": llm,
            "form": PromptForm(),
            "log_form": LogForm(),
            "title": "Prompt & API"
        }
        return render(request, "html/prompt.html", context=context)


class Room(ListView):
    template_name = ""

    def get_queryset(self) -> QuerySet[LLM]:

        if self.template_name == "html/chatroom.html" or self.template_name == "html/hotpot.html":
            return LLM.objects.all()
        elif self.template_name == "html/lagent.html" or self.template_name == "html/functional_agent.html" or self.template_name == "html/csv_wizard.html":
            return LLM.objects.filter(agent_availability=True)

    def get_context_data(self, **kwargs: typing.Any) -> object:
        context = super(Room, self).get_context_data(**kwargs)
        if self.template_name == "html/chatroom.html":
            context['title'] = "Chat Bot"
            context['destination'] = "chat"
        elif self.template_name == "html/functional_agent.html":
            context['title'] = "Toolbox"
            context['destination'] = "toolbox"
        elif self.template_name == "html/csv_wizard.html":
            context['title'] = "Data Analysis"
            context['destination'] = "dataanalysis"
        elif self.template_name == "html/lagent.html" or self.template_name == "html/hotpot.html":
            root_nodes = InstructionTree.objects.filter(level=0)
            for root in root_nodes:
                if root.name == "Assignment Agent":
                    default_template = root
                    default_child_template = root.get_children()
            context['templates'] = root_nodes
            context['template'] = default_template
            context['child_template'] = default_child_template.order_by('code')
            if self.template_name == "html/lagent.html":
                context['destination'] = "engineer"
                context['title'] = "Prompt Engineer"
            elif self.template_name == "html/hotpot.html":
                context['destination'] = "hotpot"
                context['title'] = "Hotpot Mode"
        context['key'] = self.kwargs['key']
        context['llms'] = self.get_queryset()
        return context
