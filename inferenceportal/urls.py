

from django.contrib import admin
from decouple import config
from django.urls import include, path
from server.views.information import (handler_403, 
                                      handler_404, 
                                      handler_429, 
                                      handler_500)
from .api import api

urlpatterns = [
    path("", include("server.urls")),
    path(f"{config('ADMIN_PATH')}/", admin.site.urls),
    path('captcha/', include('captcha.urls')),
    path("api/", api.urls),
    path('tinymce/', include('tinymce.urls')),
]

handler403 = handler_403
handler404 = handler_404
handler429 = handler_429
handler500 = handler_500
