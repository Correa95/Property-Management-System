from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import redirect
from api.models import Tenant, Lease, Payment
from .serializers import TenantSerializer, LeaseSerializer, MaintenanceRequest, PaymentSerializer 

# Create your views here.

# Get All Tenants Routes
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTenants(request):
    tenants = Tenant.object.all()
    serializer = TenantSerializer(tenants, many = True)
    return Response(serializer.data)

# Get Single Tenants Routes
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTenant(request, pk):
    tenant = tenant.object.get(id = pk)
    serializer = TenantSerializer(tenant, many = False)
    return Response(serializer.data)

# Update Tenant
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def editTenant(request, pk):
    tenant = Tenant.objects.get(Tenant, pk=pk)
    first_name = request.POST.get("first_name")
    last_name = request.POST.get("last_name")
    end_date = request.POST.get("end_date")
    monthly_rent = request.POST.get("monthly_rent")
    
    # Update tenant info if provided
    if tenant:
        if first_name:
            tenant.first_name = first_name
        if last_name:
            tenant.last_name = last_name
        if end_date:
            tenant.end_date = end_date
        if monthly_rent:
            tenant.monthly_rent = monthly_rent
        tenant.save()

    # Update the lease if it exists and the fields are provided
    lease = Lease.objects.filter(tenant=tenant).first()
    if lease:
        if end_date:
            lease.end_date = parse_date(end_date)  # Ensure correct date format
        if monthly_rent:
            lease.monthly_rent = Decimal(monthly_rent)  # Ensure correct number format
        lease.save()

        
# Create Tenant Route
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createTenant(request):
    if request.method == 'POST':
        serializer = TenantSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
# Lease Route
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getLeases(request):
    leases = Lease.object.all()
    serializer = LeaseSerializer(leases, many = True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getLease(request, pk):
    lease = lease.object.get(id = pk)
    serializer = LeaseSerializer(lease, many = False)
    return Response(serializer.data)

# Payments Route
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPayments(request):
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPayment(request):
    if request.method == 'POST':
        serializer = PaymentSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tenant_profile(request):
    tenant = Tenant.objects.get(user=request.user)
    # Render tenant details and options to request maintenance or pay rent
    return Response(request, 'tenant_profile.html', {'tenant': tenant})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def maintenance(request):
    if request.method == 'POST':
        description = request.POST['description']
        tenant = Tenant.objects.get(user=request.user)
        MaintenanceRequest.objects.create(tenant=tenant, description=description)
        return redirect('tenant_profile')

    return Response(request, 'maintenance_request.html')

