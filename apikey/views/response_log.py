
from django.shortcuts import render
from apikey.models import (
    PromptResponse,
    APIKEY,
)
from django.http import HttpResponse
from django.contrib import messages
from apikey.util.commond_func import get_key
from django.core.cache import cache
from apikey.forms import LogForm
from django.core.signing import Signer
from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponseRedirect
)
from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q

def log_redirect(request: HttpRequest) -> HttpResponse | HttpResponseRedirect:
    if request.method == 'POST':
        form = LogForm(request.POST)
        signer = Signer()
        if form.is_valid():
            key = form.cleaned_data['key_']
            name = form.cleaned_data['key_name']
            check = get_key(key=key, name=name)
            if check:
                return HttpResponseRedirect(f"/prompt/{signer.sign(key)}")
            else:
                messages.error(
                    request, "Error: Key or/and Key Name is/are incorrent.",  extra_tags='credit')
                return HttpResponseRedirect("/promptresponse")
        else:
            messages.error(
                request, "Error: Captcha Failed.",  extra_tags='credit')
            return HttpResponseRedirect("/promptresponse")
    elif request.method == 'GET':
        return render(request, "html/prompt_log_redirect.html", context={'form': LogForm(), 'title': 'Get Log'})


def response_log(request: HttpRequest,  key: str) -> HttpResponse:
    context = {"key": key, 'title': "Log"}
    return render(request, "html/prompt_log.html", context)


class LogListJson(BaseDatatableView):
    columns = ['id', 'prompt', 'response',
               'model.name', 'created_at', 'p_type', 'cost']
    order_columns = ['id', 'prompt', 'response',
                     'model.name', 'created_at', 'p_type', 'cost']
    max_display_length = 500

    def get_initial_queryset(self):
        signer = Signer()
        filter_key = self.kwargs['key']
        key_ = APIKEY.objects.get_from_key(signer.unsign(filter_key))
        return PromptResponse.objects.filter(key=key_).order_by('-id')

    def filter_queryset(self, qs):
        search = self.request.GET.get('search[value]', None)
        if search:
            qs = qs.filter(Q(prompt__icontains=search) |
                           Q(response__icontains=search))
        return qs
