# from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from api.models import  Apartment, Tenant, Leases, Payment, AdminUser



class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['id', 'first_name', 'last_name', 'user_email', 'user_name', 'user_password']
        extra_kwargs = {
            'user_password': {'write_only': True}  # Hide password in response
        }

    def create(self, validated_data):
        user = AdminUser.objects.create(username= validated_data["user_name"], email=validated_data["email"]) 
        user.set_password(validated_data["user_password"])
        user.save()
        return user
        
        # validated_data['user_password'] = make_password(validated_data['user_password'])
        # return super().create(validated_data)


class ApartmentSerializer(serializers.ModelSerializer):
    total_units = serializers.SerializerMethodField()

    class Meta:
        model = Apartment
        fields = ['id', 'name', 'address', 'num_units', 'total_units']
        read_on_fields = ["id"]
    
    def get_total_units(self, obj):
        # Example: Calculate or fetch a custom value (modify logic as needed)
        # return obj.num_units  # Replace with actual logic if required
        return Apartment.objects.filter(name=obj.name).count()

class TenantSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = Tenant
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'full_name']
        read_only_fields = ['id']

    def get_full_name(self, obj):
        # Combines first and last name into a single custom field
        return f"{obj.first_name} {obj.last_name}"



class LeaseSerializer(serializers.ModelSerializer):
    tenant_name = serializers.SerializerMethodField()

    class Meta:
        model = Leases
        fields = ['id', 'apartment', 'tenant', 'tenant_name', 'start_date', 'end_date','security_deposit','is_active' 'monthly_rent']
        read_only_fields = ['id', "tenant_name"]

    def get_tenant_name(self, obj):
        # Return tenant's name associated with the lease
        return f"{obj.tenant.first_name} {obj.tenant.last_name}"

    def validate_monthly_rent(self, value):
        # Custom validation for monthly rent
        if value <= 0:
            raise serializers.ValidationError("Monthly rent must be a positive value.")
        return value
    
    def validate(self, data):
        if data['end_date'] <= data['start_date']:
            raise serializers.ValidationError("End date must be after the start date.")
        return data


class PaymentSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()
    class Meta:
        model = Payment
        # fields = "__all__"
        fields = ['id', 'lease', 'amount', 'payment_date', 'formatted_date', 'payment_method', 'is_late_payment']

        read_only_fields = ["id"]


    def get_formatted_date(self, obj):
        # Format the payment date
        return obj.payment_date.strftime('%B %d, %Y')

    def validate_amount(self, value):
        # Custom validation to ensure payment amount is positive
        if value <= 0:
            raise serializers.ValidationError("Payment amount must be positive.")
        return value
    



