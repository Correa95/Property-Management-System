# Property-Management-System

<!-- ////////////////////////////// -->

# Below is a basic Prisma schema for a Property Management System. It models entities such as users, properties, units, leases, payments, and maintenance requests.

<!-- ////////////////////////////////////// -->

# Breakdown of the Schema:

# User: This table stores all users (tenants, landlords, and property managers) with fields like firstName, lastName, email, and their role (Tenant, Landlord, Manager).

# Role: This table defines the roles for users (TENANT, LANDLORD, MANAGER).

# Property: Each property is managed by a landlord, and each property can have multiple units. Properties are associated with a landlord via ownerId.

# Unit: A unit is part of a property. It has fields like unitNumber, rent, and available to indicate availability status. Each unit can have multiple leases over time.

# Lease: Represents a lease agreement between a tenant and the owner of a unit. Each lease has fields for startDate, endDate, monthlyRent, and a reference to a tenant and unit. The leaseStatus can be ACTIVE or TERMINATED.

# Payment: Stores payment records made by tenants for their leases. It tracks amount, paymentDate, and the status (pending, completed, or failed).

# MaintenanceRequest: Represents a maintenance request submitted by a tenant for a particular unit, with a status (pending, in progress, or completed).

# Invoice: Tracks invoices sent to tenants for rent or other charges, with fields like invoiceDate, dueDate, amount, and status (paid, unpaid, overdue).

# Enums:

# LeaseStatus: Tracks the status of the lease (active or terminated).

# PaymentStatus: Indicates whether the payment is pending, completed, or failed.

# MaintenanceStatus: Represents the current status of a maintenance request.

# InvoiceStatus: Tracks whether an invoice is paid, unpaid, or overdue.

# Role: Enum for user roles (tenant, landlord, manager).

# Expansion Ideas:

# Add Documents for storing lease agreements, photos, etc.

# Implement soft delete (for example, adding isDeleted to archive users/properties).

# Add notifications or logs for reminders of payments, maintenance updates, etc.

# This schema is adaptable and can grow as new features or entities are added to the property management system.

<!-- # This schema can serve as a solid foundation for a property management system and can be expanded with more features as needed. -->
