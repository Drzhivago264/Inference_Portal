

from django.contrib import admin
from decouple import config
from django.urls import include, path
from server.views.information import handler_404
from api.api import api

urlpatterns = [
    path("", include("server.urls")),
    path(f"{config('ADMIN_PATH')}/", admin.site.urls),
    path("api/", api.urls)
]

handler404 = handler_404

