from django.urls import path
from . import views
from .views import CreateUserView 
from .views import get_csrf_token
urlpatterns = [
  
    # path('csrf/', get_csrf_token),
     path("api/v1/csrf/", get_csrf_token, name="get_csrf_token"),
     
    # path("api/v1/createUser", views.createUser, name="createUser"),
        path("api/v1/createUser", CreateUserView.as_view(), name="create_user"),
  

    path("api/v1/createApartmentComplex", views.createApartmentComplex, name="create_apartmentComplex"),
    path('api/v1/getApartmentComplex', views.getApartmentComplex, name='get_apartmentComplex'),

    path("api/v1/createApartment", views.createApartment, name="create_apartment"),

    path("api/v1/getApartments", views.getApartments, name = "get_apartments"),

    path("api/v1/getApartment/<int:pk>", views.getApartment, name = "get_apartment"),

    path("api/v1/createTenant", views.createTenant, name = "create_tenant"),
    path("api/v1/getTenants", views.getTenants, name = "get_tenants"),
    path("api/v1/getTenant/<int:pk>", views.getTenant, name = "get_tenant"),
    # path("api/v1/editTenant", views.editTenant, name="edit_tenant"),

    # path("api/v1/editLease", views.editTenant, name="edit_tenant"),
    
    path("api/v1/editTenant/<int:pk>/", views.editTenant, name="edit_tenant"),
path("api/v1/editLease/<int:pk>/", views.editLease, name="edit_lease"),

    path('api/v1/createPayment', views.createPayment, name='create_payment'),
    path('api/v1/getPayments', views.getPayments, name='get_payments'),

    path('api/v1/maintenanceRequest', views.createMaintenance, name='createMaintenance'),

    path("api/v1/getDocuments", views.getDocuments, name="get_documents"),

    # path('api/v1/getDocument/<int:pk>/', views.getDocument, name='getDocument'),

    path('api/v1/createDocument', views.createDocument, name='create_document'),

    path('api/v1/deleteDocument/<int:pk>/delete/', views.deleteDocument, name='delete_document'),
   
]
    





