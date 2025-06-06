from django.urls import path
from . import views

from .views import get_csrf_token
urlpatterns = [
  
    # path('csrf/', get_csrf_token),
     path("api/v1/csrf/", get_csrf_token, name="get_csrf_token"),
    path("api/v1/createUser", views.createUser, name="createUser"),
      
# APARTMENT cOMPLEX ROUTES
    path("api/v1/createApartmentComplex", views.createApartmentComplex, name="create_apartmentComplex"),
    path('api/v1/getApartmentComplex', views.getApartmentComplex, name='get_apartmentComplex'),

# APARTMENT ROUTES
    path("api/v1/getApartments/", views.getApartments, name = "get_apartments"),
    path("api/v1/getApartment/<int:pk>/", views.getApartment, name = "get_apartment"),
    path("api/v1/createApartment/", views.createApartment, name="create_apartment"),

# TENANT ROUTES
    path("api/v1/getTenants/", views.getTenants, name = "get_tenants"),
    path("api/v1/getTenant/<int:pk>/", views.getTenant, name = "get_tenant"),
    path("api/v1/createTenant/", views.createTenant, name = "create_tenant"),
    path("api/v1/updateTenant/<int:pk>/", views.updateTenant, name="update_tenant"),
  
# PAYMENT ROUTES
    path('api/v1/getPayments/', views.getPayments, name='get_payments'),
    path('api/v1/createPayment/', views.createPayment, name='create_payment'),
    path("api/v1/updateLease/<int:pk>/", views.updateLease, name="update_lease"),
    
# MAINTENANCE ROUTES
    path('api/v1/maintenanceRequest/', views.createMaintenance, name='createMaintenance'),

# DOCUMENT ROUTES
    path("api/v1/getDocuments/", views.getDocuments, name="get_documents"),
    path('api/v1/createDocument/', views.createDocument, name='create_document'),
    path('api/v1/deleteDocument/<int:pk>/delete/', views.deleteDocument, name='delete_document'),

# EMPLOYEE ROUTES
    path("api/v1/getEmployees/", views.getEmployees, name="get_employees"),
    path("api/v1/getEmployee/<int:pk>/", views.getEmployee, name="get_employee"),
    path("api/v1/createEmployee/create/", views.createEmployee, name="create_employee"),
    path("api/v1/deleteEmployees/<int:pk>/", views.deleteEmployee, name="delete_employee"),
    path("api/v1/updateEmployees/<int:pk>/", views.updateEmployee, name="update_employee"),

# PAYROLL ROUTES
    path("api/v1/getPayrolls/", views.getPayrolls, name="get_payrolls"),
    path("api/v1/getPayroll/<int:pk>/", views.getPayroll, name="get_payroll"),
    path("api/v1/createPayroll/", views.createPayroll, name="create_payroll"),
    path("api/v1/UpdatePayroll/<int:pk>/update/", views.updatePayroll, name="update_payroll"),
   
]
    





