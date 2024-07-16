from django.http import HttpRequest
from django.views.decorators.cache import cache_page
from django_datatables_view.base_datatable_view import BaseDatatableView
from django.db.models import Q, Sum

from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework import status

from server.models import PromptResponse


class LogListJson(BaseDatatableView):
    columns = ['prompt', 'response',
               'model.name', 'created_at', 'p_type', 'input_cost', 'output_cost', 'number_input_tokens', 'number_output_tokens']
    order_columns = ['prompt', 'response',
                     'model.name', 'created_at', 'p_type', 'input_cost', 'output_cost', 'number_input_tokens', 'number_output_tokens']
    max_display_length = 500

    def get_initial_queryset(self):
        if self.request.user.has_perm('server.allow_view_log'):
            current_user = self.request.user
            if current_user.groups.filter(name='master_user').exists():
                master_key = current_user.apikey
            elif current_user.groups.filter(name='slave_user').exists():
                master_key = current_user.finegrainapikey.master_key
            return PromptResponse.objects.filter(key=master_key).order_by('-id')

    def filter_queryset(self, qs):
        if self.request.user.has_perm('server.allow_view_log'):
            search = self.request.GET.get('search[value]', None)
            if search:
                qs = qs.filter(Q(prompt__icontains=search) |
                               Q(response__icontains=search))
            return qs


@api_view(['GET'])
@throttle_classes([AnonRateThrottle])
def cost_api(request: HttpRequest, startdate: str, enddate: str) -> Response:
    current_user = request.user
    if current_user.id == None:
        return Response({'detail': "anon user"}, status=status.HTTP_401_UNAUTHORIZED)
    elif not current_user.has_perm('server.allow_view_cost'):
        return Response({'detail': "Not authorised to view cost"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        if current_user.groups.filter(name='master_user').exists():
            key = current_user.apikey
        elif current_user.groups.filter(name='slave_user').exists():
            key = current_user.finegrainapikey.master_key
        log_by_date = PromptResponse.objects.filter(key=key, created_at__range=[startdate, enddate]).values('created_at__date', 'model__name').order_by(
            'created_at__date').annotate(sum_input_tokens=Sum('number_input_tokens'), sum_output_tokens=Sum('number_output_tokens'))
        return Response({'cost_by_model': log_by_date}, status=status.HTTP_200_OK)
