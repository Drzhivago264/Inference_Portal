from server.models import (
    PromptResponse,
    APIKEY,
)
from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework import status
from django.contrib.auth import logout
from hashlib import sha256
from django.contrib.auth import authenticate, login
from django.http import HttpRequest

from django.utils import timezone
from server.views.serializer import CostSerializer
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


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def cost_api(request: HttpRequest, day: int) -> Response:
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        enddate = timezone.now().today()
        startdate = enddate - timezone.timedelta(days=day)
        log = PromptResponse.objects.filter(key=current_user.apikey, created_at__range=[startdate, enddate])
        serializer = CostSerializer(log, many=True)
        return Response({'cost': serializer.data}, status=status.HTTP_200_OK)
