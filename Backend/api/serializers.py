# from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.db.models import Sum
from django.contrib.auth.hashers import make_password
from api.models import  Apartment, ApartmentComplex, Tenant, Lease, Payment, User, MaintenanceRequest, Building


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    
class ApartmentSerializer(serializers.ModelSerializer):
    complex_name = serializers.CharField(source="complex.name", read_only=True)  # Show complex name
    complex_id = serializers.PrimaryKeyRelatedField(queryset=ApartmentComplex.objects.all(), source="complex")
    
    class Meta:
        model = Apartment
        fields = ['id', 'complex_id', 'complex_name', 'unit_number',  "rent_amount",'num_bedrooms', 'square_footage', 'is_available']
        read_only_fields = ["id"]


class BuildingSerializer(serializers.ModelSerializer):
    apartments = ApartmentSerializer(many=True, read_only=True)
    complex_name = serializers.CharField(source="complex.name", read_only=True)

    class Meta:
        model = Building
        fields = [
            "id", "complex", "complex_name", "building_number", "apartments"
        ]


class ApartmentComplexSerializer(serializers.ModelSerializer):
    buildings = BuildingSerializer(many=True, read_only=True)
    unit_count = serializers.IntegerField(read_only=True)
    occupied_unit_count = serializers.IntegerField(read_only=True)
    occupancy_rate = serializers.FloatField(read_only=True)

    class Meta:
        model = ApartmentComplex
        fields = [
            "id", "name", "address", "unit_count",
            "occupied_unit_count", "occupancy_rate", "buildings"
        ]


class TenantSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = Tenant
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'full_name']
        read_only_fields = ['id']

    def get_full_name(self, obj):
        # Handle cases where first_name or last_name might be missing
        first_name = obj.first_name or ""
        last_name = obj.last_name or ""
        full_name = f"{first_name} {last_name}".strip()  # Avoids extra spaces
        return full_name if full_name else "Unknown"  # Fallback if both are missing



class LeaseSerializer(serializers.ModelSerializer):
    tenant_name = serializers.SerializerMethodField()
    class Meta:
        model = Lease
        fields = ['id', 'apartment', 'tenant', 'tenant_name', 'start_date', 'end_date','security_deposit','is_active', 'monthly_rent']
        read_only_fields = ['id', "tenant_name"]

    def get_tenant_name(self, obj):
        if obj.tenant:
            return f"{obj.tenant.first_name} {obj.tenant.last_name}".strip()
        return "No tenant assigned"

    def validate_monthly_rent(self, value):
        if value <= 0:
            raise serializers.ValidationError("Monthly rent must be a positive value.")
        return value
    
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        if not start_date or not end_date:
            raise serializers.ValidationError("Both start and end dates are required.")

        if end_date <= start_date:
            raise serializers.ValidationError("End date must be after the start date.")
        
        return data


class PaymentSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()
    lease = LeaseSerializer()
    class Meta:
        model = Payment
        fields = ['id', 'lease', 'payment_amount', 'payment_date',  'payment_method', 'is_late_payment']
        read_only_fields = ["id"]


    def get_formatted_date(self, obj):
        if obj.payment_date:
            return obj.payment_date.strftime('%B %d, %Y')
        return None 

    def validate_amount(self, value):
        if not isinstance(value, (int, float)):
            raise serializers.ValidationError("Payment amount must be a number.")
        if value <= 0:
            raise serializers.ValidationError("Payment amount must be positive.")
        return value
    

class MaintenanceRequestSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.full_name', read_only=True)  # Display tenant's full name

    class Meta:
        model = MaintenanceRequest
        fields = ['id', 'tenant', 'tenant_name', 'description', 'request_date', 'status']
        read_only_fields = ['request_date', 'tenant_name']  # Ensure these fields can't be modified

    



