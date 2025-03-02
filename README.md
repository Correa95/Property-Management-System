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

# Notes on creating a Database and Connection it

1. Install psycopg (PostgreSQL Adapter for Python)
   Django requires a database adapter to connect to PostgreSQL. Install it using pip:
   pip install psycopg
   If you are using an older Django version, you might need psycopg2 instead:

2. Create a PostgreSQL Database
   Log into PostgreSQL:
   psql -U postgres
   Then, create a new database for your Django project:
3. CREATE DATABASE mydatabase;
   (Optional) Create a user and grant privileges:

4. CREATE USER myuser WITH PASSWORD 'mypassword';
   ALTER ROLE myuser SET client_encoding TO 'utf8';
   ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';
   ALTER ROLE myuser SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser; 4. Configure Django to Use PostgreSQL
   In settings.py, update the DATABASES setting:

5. DATABASES = {
   'default': {
   'ENGINE': 'django.db.backends.postgresql',
   'NAME': 'mydatabase',
   'USER': 'myuser',
   'PASSWORD': 'mypassword',
   'HOST': 'localhost', # Or your database server IP
   'PORT': '5432', # Default PostgreSQL port
   }
   }
6. Apply Migrations
   Run the following Django commands:
   python manage.py makemigrations
   python manage.py migrate 6. Test Connection
   Run:

python manage.py dbshell
If connected successfully, you should see a psql prompt.

6. Create a Superuser (Optional)
   If your app uses Django's admin panel, create an admin user:
7. python manage.py createsuperuser
   Now your Django app is connected to PostgreSQL! 🚀 Let me know if you hit any issues.
