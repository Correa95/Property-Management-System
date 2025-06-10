from django.urls import path
from . import views

from .views import get_csrf_token
from django.http import JsonResponse
urlpatterns = [
  
    # path("csrf/", get_csrf_token, name="get_csrf_token"),
    path("createUser/", views.createUser, name="createUser"),

# APARTMENT cOMPLEX ROUTES
    path("createApartmentComplex/", views.createApartmentComplex, name="create_apartmentComplex"),
    path('getApartmentComplex/', views.getApartmentComplex, name='get_apartmentComplex'),

# APARTMENT ROUTES
    path("getApartments/", views.getApartments, name = "get_apartments"),
    path("getApartment/<int:pk>/", views.getApartment, name = "get_apartment"),
    path("createApartment/", views.createApartment, name="create_apartment"),

# TENANT ROUTES
    path("getTenants/", views.getTenants, name = "get_tenants"),
    path("getTenant/<int:pk>/", views.getTenant, name = "get_tenant"),
    path("createTenant/", views.createTenant, name = "create_tenant"),
    path("updateTenant/<int:pk>/", views.updateTenant, name="update_tenant"),
  
# PAYMENT ROUTES
    path('getPayments/', views.getPayments, name='get_payments'),
    path('createPayment/', views.createPayment, name='create_payment'),
    path("updateLease/<int:pk>/", views.updateLease, name="update_lease"),
    
# MAINTENANCE ROUTES
    path('maintenanceRequest/', views.createMaintenance, name='createMaintenance'),

# DOCUMENT ROUTES
    path("getDocuments/", views.getDocuments, name="get_documents"),
    path('createDocument/', views.createDocument, name='create_document'),
    path('deleteDocument/<int:pk>/delete/', views.deleteDocument, name='delete_document'),

# EMPLOYEE ROUTES
    path("getEmployees/", views.getEmployees, name="get_employees"),
    path("getEmployee/<int:pk>/", views.getEmployee, name="get_employee"),
    path("createEmployee/create/", views.createEmployee, name="create_employee"),
    path("deleteEmployees/<int:pk>/", views.deleteEmployee, name="delete_employee"),
    path("updateEmployees/<int:pk>/", views.updateEmployee, name="update_employee"),

# PAYROLL ROUTES
    path("getPayrolls/", views.getPayrolls, name="get_payrolls"),
    path("getPayroll/<int:pk>/", views.getPayroll, name="get_payroll"),
    path("createPayroll/", views.createPayroll, name="create_payroll"),
    path("UpdatePayroll/<int:pk>/update/", views.updatePayroll, name="update_payroll"),
   
]
    





