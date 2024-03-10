

from django.contrib import admin
from decouple import config
from django.urls import include, path
from apikey import views
from .api import api

urlpatterns = [
    path("", include("apikey.urls")),
    path(f"{config('ADMIN_PATH')}/", admin.site.urls),
    path('captcha/', include('captcha.urls')),
    path("api/", api.urls),
]

handler403 = views.handler_403
handler404 = views.handler_404
handler429 = views.handler_429
handler500 = views.handler_500
