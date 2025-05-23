from django.urls import path
from . import views
# from .views import csrf


urlpatterns = [
    # path("api/csrf/", views.csrf, name="csrf"),
    path("api/v1/createUser", views.create_user, name="create_user"),
    path("api/v1/getUser", views.getUser, name="get_user"),

    path("api/v1/createApartmentComplex", views.createApartmentComplex, name="create_apartmentComplex"),
    path('api/v1/getApartmentComplex/', views.getApartmentComplex, name='get_apartmentComplex'),

    path("api/v1/createApartment", views.createApartment, name="create_apartment"),

    path("api/v1/getApartments/", views.getApartments, name = "get_apartments"),

    path("api/v1/getApartment/<str:pk>/", views.getApartment, name = "get_apartment"),

    path("api/v1/createTenant/", views.createTenant, name = "create_tenant"),
    path("api/v1/getTenants/", views.getTenants, name = "get_tenants"),
    path("api/v1/getTenant/<str:pk>/", views.getTenant, name = "get_tenant"),
    path("api/v1/editTenant/", views.editTenant, name="edit_tenant"),

    
    path('api/v1/createPayment', views.createPayment, name='create_payment'),
    path('api/v1/getPayments', views.getPayments, name='get_payments'),

    path('api/v1/maintenanceRequest/', views.maintenance, name='maintenanceRequests'),
   
]
    





