from django.urls import path
from . import views

urlpatterns = [
    path("api/tenants/", views.getTenants, name = "get_tenants"),
    path("api/tenant/<str:pk>/", views.getTenant, name = "get_tenant"),
    path("api/tenant/", views.createTenant, name = "create_tenant"),
    path("api/leases/", views.getLeases, name = "get_lease"),
    path("api/lease/<str:pk>/", views.getLease, name = "get_lease"),
    path('api/payments', views.getPayments, name='get_payments'),
    path('api/payment', views.createPayment, name='create_payment'),
    
]
    

