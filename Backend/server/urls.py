from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
# import api.urls
from django.http import JsonResponse


from api.views import get_csrf_token

urlpatterns = [
    path("api/v1/csrf/", get_csrf_token),  # <-- put this FIRST

    path('', admin.site.urls),
    path("api/v1/debug/", lambda request: JsonResponse({"message": "Server-level debug route works"})),
    path("api/v1/auth/login", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/token/auth/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/v1/csrf/", get_csrf_token),
    # path("api/v1/", include(api.urls))
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)







    
