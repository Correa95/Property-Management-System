from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static


# from api.views import csrf  
urlpatterns = [
    path('', admin.site.urls),
    #  path("api/csrf", csrf, name="csrf"),
    path("api/v1/auth/login", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/token/auth/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("api.urls"))
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
