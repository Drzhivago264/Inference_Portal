

from django.contrib import admin
from django.urls import include, path
from apikey import views
urlpatterns = [
    path("", include("apikey.urls")),
    path("admin/", admin.site.urls),
    path('captcha/', include('captcha.urls')),
]

handler403 = views.handler_403
handler404 = views.handler_404
handler405 = views.handler_500
