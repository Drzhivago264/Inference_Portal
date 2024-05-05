
from django.shortcuts import render
from server.models import (
    PromptResponse,
    APIKEY,
)
from django.http import HttpResponse
from django.contrib import messages
from server.util.commond_func import get_key
from django.core.cache import cache
from server.forms import LogForm
from django.core.signing import Signer
from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponseRedirect
)
from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q


class LogListJson(BaseDatatableView):
    columns = ['id', 'prompt', 'response',
               'model.name', 'created_at', 'p_type', 'input_cost', 'output_cost', 'number_input_tokens', 'number_output_tokens']
    order_columns = ['id', 'prompt', 'response',
                     'model.name', 'created_at', 'p_type', 'input_cost', 'output_cost', 'number_input_tokens', 'number_output_tokens']
    max_display_length = 500

    def get_initial_queryset(self):
        user = self.request.user
        key_ = user.apikey
        return PromptResponse.objects.filter(key=key_).order_by('-id')

    def filter_queryset(self, qs):
        search = self.request.GET.get('search[value]', None)
        if search:
            qs = qs.filter(Q(prompt__icontains=search) |
                           Q(response__icontains=search))
        return qs
