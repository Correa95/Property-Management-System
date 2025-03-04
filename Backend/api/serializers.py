# from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.db.models import Sum
from api.models import  Apartment, Tenant, Lease, Payment, AdminUser



class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['id', 'first_name', 'last_name', 'user_email', 'user_name', 'user_password']
        extra_kwargs = {
            'user_password': {'write_only': True}  # Hide password in response
        }

    def create(self, validated_data):
        user = AdminUser.objects.create_user(
            username=validated_data["user_name"], 
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["user_password"]  # Hashes password automatically
        )
        return user


class ApartmentSerializer(serializers.ModelSerializer):
    total_units = serializers.SerializerMethodField()
    class Meta:
        model = Apartment
        fields = ['id', 'name', 'address', 'num_units', 'total_units']
        read_only_fields = ["id"]
    
    def get_total_units(self, obj):
        return Apartment.objects.filter(name=obj.name).aggregate(total=Sum('num_units'))['total'] or 0


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
        fields = ['id', 'apartment', 'tenant', 'tenant_name', 'start_date', 'end_date','security_deposit','is_active' 'monthly_rent']
        read_only_fields = ['id', "tenant_name"]

    def get_tenant_name(self, obj):
        if obj.tenant:
            return f"{obj.tenant.first_name} {obj.tenant.last_name}".strip()
        return "No tenant assigned"

    def validate_monthly_rent(self, value):
        if value <= 0:
            raise serializers.ValidationError("Monthly rent must be a positive value.")
        return value
    
    def validate_lease_data(self, data):
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
        fields = ['id', 'lease', 'amount', 'payment_date', 'formatted_date', 'payment_method', 'is_late_payment']
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
    



