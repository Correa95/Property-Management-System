from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from api.models import Tenant, Leases, Payment, AdminUser
from .serializers import TenantSerializer, LeaseSerializer, AdminUserSerializer, PaymentSerializer 

# Create your views here.

# Get All Tenants Routes
@api_view(["GET"])
def getTenants(request):
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
def createTenant(request):
    if request.method == 'POST':
        serializer = TenantSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
# Creating Lease Route
@api_view(["GET"])
def getLeases(request):
    leases = Leases.object.all()
    serializer = LeaseSerializer(leases, many = True)
    return Response(serializer.data)

@api_view(["GET"])
def getLease(request, pk):
    lease = lease.object.get(id = pk)
    serializer = LeaseSerializer(lease, many = False)
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
    @api_view(['POST'])
    def get(self, request):
        users = AdminUser.objects.all()
        serializer = AdminUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        if request.method == 'POST':
            serializer = AdminUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# # Todo Routes
# @api_view(["GET"])
# def getTodo(request):
#     todo = todo.object.all()
#     serializer = TodoSerializer(todo, many = True)
#     return Response(serializer.data)


# @api_view(["POST"])
# def createTodo(request):
#     if request.method == 'POST':
#       serializer = TodoSerializer(data = request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
