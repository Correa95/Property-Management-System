from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.dateparse import parse_date
from decimal import Decimal
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.shortcuts import redirect
from api.models import Apartment, ApartmentComplex, Tenant, Lease, Payment, User, MaintenanceRequest
from .serializers import UserSerializer, ApartmentSerializer, ApartmentComplexSerializer, TenantSerializer, LeaseSerializer, PaymentSerializer

# Set CSRF token
@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

# User Registration
@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get All Users
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUser(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# Create Apartment Complex
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createApartmentComplex(request):
    serializer = ApartmentComplexSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get All Apartment Complexes
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getApartmentComplex(request):
    apartmentComplex = ApartmentComplex.objects.all()
    serializer = ApartmentComplexSerializer(apartmentComplex, many=True)
    return Response(serializer.data)

# Create Apartment
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createApartment(request):
    serializer = ApartmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get All Apartments
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getApartments(request):
    apartments = Apartment.objects.all()
    serializer = ApartmentSerializer(apartments, many=True)
    return Response(serializer.data)

# Get Single Apartment
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getApartment(request, pk):
    try:
        apartment = Apartment.objects.get(pk=pk)
    except Apartment.DoesNotExist:
        return Response({"detail": "Apartment not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = ApartmentSerializer(apartment)
    return Response(serializer.data)

# Create Tenant
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createTenant(request):
    serializer = TenantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get All Tenants
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTenants(request):
    tenants = Tenant.objects.all()
    serializer = TenantSerializer(tenants, many=True)
    return Response(serializer.data)

# Get Single Tenant
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTenant(request, pk):
    try:
        tenant = Tenant.objects.get(id=pk)
    except Tenant.DoesNotExist:
        return Response({"detail": "Tenant not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = TenantSerializer(tenant)
    return Response(serializer.data)

# Update Tenant
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def editTenant(request, pk):
    try:
        tenant = Tenant.objects.get(pk=pk)
    except Tenant.DoesNotExist:
        return Response({"detail": "Tenant not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = TenantSerializer(tenant, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update Lease
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def editLease(request, pk):
    try:
        lease = Lease.objects.get(pk=pk)
    except Lease.DoesNotExist:
        return Response({"detail": "Lease not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = LeaseSerializer(lease, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get All Leases

# Create Lease
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createLease(request):
    serializer = LeaseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getLeases(request):
    leases = Lease.objects.all()
    serializer = LeaseSerializer(leases, many=True)
    return Response(serializer.data)

# Get Single Lease
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getLease(request, pk):
    try:
        lease = Lease.objects.get(id=pk)
    except Lease.DoesNotExist:
        return Response({"detail": "Lease not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = LeaseSerializer(lease)
    return Response(serializer.data)

# Create Payment
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPayment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get All Payments
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPayments(request):
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)

# Create Maintenance Request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def maintenance(request):
    description = request.data.get('description')
    try:
        tenant = Tenant.objects.get(user=request.user)
    except Tenant.DoesNotExist:
        return Response({"detail": "Tenant not found"}, status=status.HTTP_404_NOT_FOUND)

    MaintenanceRequest.objects.create(tenant=tenant, description=description)
    return Response({"detail": "Maintenance request created"}, status=status.HTTP_201_CREATED)
