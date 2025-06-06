from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET
from api.models import Apartment, ApartmentComplex, Tenant, Lease, Payment, User, MaintenanceRequest, Document, Employee, Payroll
from .serializers import (
    UserSerializer, ApartmentSerializer, ApartmentComplexSerializer,
    TenantSerializer, LeaseSerializer, PaymentSerializer, DocumentSerializer, EmployeeSerializer, PayrollSerializer
)

        # return request.user.role is ["Admin", "Client"]

class IsManagerOrIsAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ["Manager", "Client"]
        )
class IsAdminOrIsClient(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ["Admin", "Client"]
        )

class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "Manager"

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "Admin"
    
class IsClient(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "Client"



@require_GET
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})


@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def createUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






@api_view(["POST"])
@permission_classes([IsAdmin])
def createApartmentComplex(request):
    serializer = ApartmentComplexSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdmin])
def getApartmentComplex(request):
    apartmentComplex = ApartmentComplex.objects.all()
    serializer = ApartmentComplexSerializer(apartmentComplex, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdmin])
def createApartment(request):
    serializer = ApartmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdmin])
def getApartments(request):
    apartments = Apartment.objects.all()
    serializer = ApartmentSerializer(apartments, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdmin])
def getApartment(request, pk):
    try:
        apartment = Apartment.objects.get(pk=pk)
    except Apartment.DoesNotExist:
        return Response({"detail": "Apartment not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = ApartmentSerializer(apartment)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdmin])
def createTenant(request):
    serializer = TenantSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdmin])
def getTenants(request):
    tenants = Tenant.objects.all()
    serializer = TenantSerializer(tenants, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdmin])
def getTenant(request, pk):
    try:
        tenant = Tenant.objects.get(id=pk)
    except Tenant.DoesNotExist:
        return Response({"detail": "Tenant not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = TenantSerializer(tenant)
    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAdmin])
def updateTenant(request, pk):
    try:
        tenant = Tenant.objects.get(pk=pk)
    except Tenant.DoesNotExist:
        return Response({"detail": "Tenant not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = TenantSerializer(tenant, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
@permission_classes([IsAdmin])
def updateLease(request, pk):
    try:
        lease = Lease.objects.get(pk=pk)
    except Lease.DoesNotExist:
        return Response({"detail": "Lease not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = LeaseSerializer(lease, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAdmin])
def createLease(request):
    serializer = LeaseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAdmin])
def getLeases(request):
    leases = Lease.objects.all()
    serializer = LeaseSerializer(leases, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdmin])
def getLease(request, pk):
    try:
        lease = Lease.objects.get(id=pk)
    except Lease.DoesNotExist:
        return Response({"detail": "Lease not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = LeaseSerializer(lease)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminOrIsClient])
def createPayment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdmin])
def getPayments(request):
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsClient])
def createMaintenance(request):
    description = request.data.get('description')
    try:
        tenant = Tenant.objects.get(user=request.user)
    except Tenant.DoesNotExist:
        return Response({"detail": "Tenant not found"}, status=status.HTTP_404_NOT_FOUND)

    MaintenanceRequest.objects.create(tenant=tenant, description=description)
    return Response({"detail": "Maintenance request created"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAdmin])
def getDocuments(request):
    documents = Document.objects.all()
    serializer = DocumentSerializer(documents, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAdmin])
# def getDocument(request, pk):
#     try:
#         document = Document.objects.get(pk=pk)
#     except Document.DoesNotExist:
#         return Response({"error": "Document not found"}, status=status.HTTP_404_NOT_FOUND)

#     serializer = DocumentSerializer(document)
#     return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdmin])
def createDocument(request):
    serializer = DocumentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdmin])
def deleteDocument(request, pk):
    try:
        document = Document.objects.get(pk=pk)
    except Document.DoesNotExist:
        return Response({"error": "Document not found"}, status=status.HTTP_404_NOT_FOUND)

    document.delete()
    return Response({"message": "Document deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# EMPLOYEE VIEWS

@api_view(["GET"])
@permission_classes([IsManager])
def getEmployees(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsManager])
def getEmployee(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = EmployeeSerializer(employee)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsManager])
def createEmployee(request):  # Renamed from createEmployer for consistency
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsManager])
def updateEmployee(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = EmployeeSerializer(employee, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsManager])
def deleteEmployee(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
    employee.delete()
    return Response({"message": "Employee deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# PAYROLL VIEWS
@api_view(["GET"])
@permission_classes([IsManager])
def getPayrolls(request):
    payrolls = Payroll.objects.all()
    serializer = PayrollSerializer(payrolls, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsManager])
def getPayroll(request, pk):
    try:
        payroll = Payroll.objects.get(pk=pk)
    except Payroll.DoesNotExist:
        return Response({"error": "Payroll not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = PayrollSerializer(payroll)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsManager])
def createPayroll(request):
    serializer = PayrollSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["PUT"])
@permission_classes([IsManager])
def updatePayroll(request, pk):
    try:
        payroll = Payroll.objects.get(pk=pk)
    except Payroll.DoesNotExist:
        return Response({"error": "Payroll not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PayrollSerializer(payroll, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

