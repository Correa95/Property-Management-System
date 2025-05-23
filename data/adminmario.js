from django.contrib import admin
from .models import (
    User, ApartmentComplex, Building, Apartment,
    Tenant, Lease, Payment
)

# ─────────────────────────────────────────────
# User
# ─────────────────────────────────────────────
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # Usually you *can* allow editing user info; if you truly
    # want it read-only keep these:
    readonly_fields = ("first_name", "last_name",
                       "user_email", "user_name")
    list_display = ("first_name", "last_name", "user_email", "user_name")
    search_fields = ("first_name", "last_name", "user_email", "user_name")

# ─────────────────────────────────────────────
# ApartmentComplex
# ─────────────────────────────────────────────
@admin.register(ApartmentComplex)
class ApartmentComplexAdmin(admin.ModelAdmin):
    # name/address parts are normally editable; mark helpers read-only
    readonly_fields = ("unit_count", "occupied_unit_count", "occupancy_rate")
    list_display    = ("name", "street", "city", "state", "postal_code",
                       "unit_count", "occupancy_rate")
    search_fields   = ("name", "street", "city", "state", "postal_code")

# ─────────────────────────────────────────────
# Building
# ─────────────────────────────────────────────
@admin.register(Building)
class BuildingAdmin(admin.ModelAdmin):
    readonly_fields = ("complex", "building_number")
    list_display    = ("building_number", "complex")
    search_fields   = ("building_number", "complex__name")

# ─────────────────────────────────────────────
# Apartment
# ─────────────────────────────────────────────
@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    # Mark helper/computed fields read-only; keep real columns editable
    readonly_fields = ("is_available",)      # if you never edit availability here
    list_display    = ("building", "unit_number", "rent_amount",
                       "num_bedrooms", "square_footage", "is_available")
    search_fields   = ("unit_number", "building__building_number",
                       "building__complex__name")

# ─────────────────────────────────────────────
# Tenant
# ─────────────────────────────────────────────
@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display  = ("first_name", "last_name", "email", "phone_number")
    search_fields = ("first_name", "last_name", "email", "phone_number")

# ─────────────────────────────────────────────
# Lease
# ─────────────────────────────────────────────
@admin.register(Lease)
class LeaseAdmin(admin.ModelAdmin):
    readonly_fields = ("is_active",)         
    list_display    = ("tenant", "apartment",
                       "start_date", "end_date", "monthly_rent", "is_active")
    search_fields   = ("tenant__first_name", "tenant__last_name",
                       "apartment__unit_number",
                       "apartment__building__complex__name")

# ─────────────────────────────────────────────
# Payment
# ─────────────────────────────────────────────
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    readonly_fields = ()          # everything editable by default
    list_display    = ("lease", "payment_amount",
                       "payment_date", "payment_method", "is_late_payment")
    search_fields   = ("lease__tenant__first_name", "lease__tenant__last_name",
                       "lease__apartment__unit_number")


# Register models with their corresponding admin classes
admin.site.register(ApartmentComplex, ApartmentComplexAdmin),
admin.site.register(Building, BuildingAdmin),
admin.site.register(User, UserAdmin)
admin.site.register(Apartment, ApartmentAdmin)
admin.site.register(Tenant, TenantAdmin)
admin.site.register(Lease, LeaseAdmin)
admin.site.register(Payment, PaymentAdmin)
