from django.contrib.auth.decorators import permission_required
from django.db.models import Q, Sum
from django.http import HttpRequest
from django.views.decorators.cache import cache_page
from django_datatables_view.base_datatable_view import BaseDatatableView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from server.models.log import PromptResponse
from server.utils.sync_.sync_cache import get_user_or_set_cache


class LogListJson(BaseDatatableView):
    columns = [
        "prompt",
        "response",
        "model.name",
        "created_at",
        "type",
        "input_cost",
        "output_cost",
        "number_input_tokens",
        "number_output_tokens",
    ]
    order_columns = [
        "prompt",
        "response",
        "model.name",
        "created_at",
        "type",
        "input_cost",
        "output_cost",
        "number_input_tokens",
        "number_output_tokens",
    ]
    max_display_length = 500

    def get_initial_queryset(self):
        if self.request.user.has_perm("server.allow_view_log"):
            current_user = self.request.user
            master_key, _ = get_user_or_set_cache(
                prefix="user_tuple",
                key=current_user.password,
                timeout=60,
                current_user=current_user,
            )
            if master_key:
                return PromptResponse.objects.filter(key=master_key).order_by("-id")

    def filter_queryset(self, qs):
        if self.request.user.has_perm("server.allow_view_log"):
            search = self.request.GET.get("search[value]", None)
            if search:
                qs = qs.filter(
                    Q(prompt__icontains=search) | Q(response__icontains=search)
                )
            return qs


@api_view(["GET"])
@throttle_classes([AnonRateThrottle])
@permission_classes([IsAuthenticated])
@cache_page(60 * 15)
@permission_required("server.allow_view_cost", raise_exception=True)
def cost_api(request: HttpRequest, startdate: str, enddate: str) -> Response:
    current_user = request.user
    master_key, _ = get_user_or_set_cache(
        prefix="user_tuple",
        key=current_user.password,
        timeout=60,
        current_user=current_user,
    )
    if not master_key:
        raise PermissionDenied(detail="Your token is expired")
    log_by_date = (
        PromptResponse.objects.filter(
            key=master_key, created_at__range=[startdate, enddate]
        )
        .values("created_at__date", "model__name")
        .order_by("created_at__date")
        .annotate(
            sum_input_tokens=Sum("number_input_tokens"),
            sum_output_tokens=Sum("number_output_tokens"),
        )
    )
    return Response({"cost_by_model": log_by_date}, status=status.HTTP_200_OK)
