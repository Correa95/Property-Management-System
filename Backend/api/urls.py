from django.urls import path
from . import views

urlpatterns = [
    path('tenant/profile/', views.tenant_profile, name='tenant_profile'),

    path("api/v1/tenants/", views.getTenants, name = "get_tenants"),
    path("api/v1/tenant/<str:pk>/", views.getTenant, name = "get_tenant"),
    path("api/v1/tenant/", views.createTenant, name = "create_tenant"),

    # path("api/leases/", views.getLeases, name = "get_lease"),
    # path("api/lease/<str:pk>/", views.getLease, name = "get_lease"),
    path("api/v1/editTenant/", views.editTenant, name="edit_tenant"),
    path('api/v1/payments', views.getPayments, name='get_payments'),
    path('api/v1/payment', views.createPayment, name='create_payment'),

    path('api/v1/maintenance/', views.maintenance, name='maintenanceRequests'),
    # path('api/v1/maintenance-requests/<int:pk>/', views.MaintenanceRequestDetailView, name='maintenance_request_detail')
    path('tenant/maintenance-request/', views.maintenance_request, name='maintenance_request'),
]
    


    # path('property-manager/manage-requests/', views.manage_maintenance_requests, name='manage_maintenance_requests'),
    # path('property-manager/update-request/<int:request_id>/', views.update_request_status, name='update_request_status'),



