from django.urls import path
from . import views

urlpatterns = [
    path("api/v1/tenants/", views.getTenants, name = "get_tenants"),
    path("api/v1/tenant/<str:pk>/", views.getTenant, name = "get_tenant"),
    # path("api/tenant/", views.createTenant, name = "create_tenant"),
    # path("api/leases/", views.getLeases, name = "get_lease"),
    # path("api/lease/<str:pk>/", views.getLease, name = "get_lease"),
    path("api/v1/editTenant/", views.editTenant, name="editTenant"),
    path('api/v1/payments', views.getPayments, name='get_payments'),
    path('api/v1/payment', views.createPayment, name='create_payment'),
    
]
    

