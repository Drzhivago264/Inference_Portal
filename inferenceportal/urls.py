from decouple import config
from django.contrib import admin
from django.urls import include, path

from api.api import api
from server.views.information import handler_404

urlpatterns = [
    path("", include("server.urls")),
    path(f"{config('ADMIN_PATH')}", admin.site.urls),
    path("api/", api.urls),
]

handler404 = handler_404
