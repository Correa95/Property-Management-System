from django import path
from . import views



urlpatterns = [
    path("api/", views.getTenants, name = "get_tenants"),
    path("api/<str:pk>/", views.getTenant, name = "get_tenant"),
    path("api/", views.createTenant, name = "create_tenant"),
    path("api/", views.getTodos, name = "get_todo"),
    path("api/", views.createTodo, name ="create_todo"),
    path('api/', views.getPayments, name='get_payments'),
    path('api/', views.createPayment, name='create_payment'),
    
]

