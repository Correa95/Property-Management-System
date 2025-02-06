from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from api.models import Tenant, Lease, Payment, Todo, AdminUser
from .serializers import TenantSerializer, TodoSerializer, AdminUserSerializer, PaymentSerializer 

# Create your views here.

# Get All Tenants Routes
@api_view(["GET"])
def getTenants(request0):
    tenants = Tenant.object.all()
    serializer = TenantSerializer(tenants, many = True)
    return Response(serializer.data)

# Get Single Tenants Routes
@api_view(["GET"])
def getTenant(request, pk):
    tenant = tenant.object.get(id = pk)
    serializer = TenantSerializer(tenant, many = False)
    return Response(serializer.data)

# Create Tenant Route
@api_view(["POST"])
def createTenant(response):
    serializer = TenantSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
# Creating Lease Route

@api_view(["POST"])
def 

# Todo Routes
@api_view(["GET"])
def getTodo(request):
    todo = todo.object.all()
    serializer = TodoSerializer(todo, many = True)
    return Response(serializer.data)


@api_view(["POST"])
def createTodo(response):
    serializer = TodoSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    

@api_view(['GET'])
def getPayments(request):
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createPayment(request):
    if request.method == 'POST':
        serializer = PaymentSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# Admin Serializer
class AdminUserListView(APIView):
    def get(self, request):
        users = AdminUser.objects.all()
        serializer = AdminUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = AdminUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
