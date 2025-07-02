--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: property_management_system_db_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO property_management_system_db_user;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: property_management_system_db_user
--

COMMENT ON SCHEMA public IS '';


--
-- Name: DocumentType; Type: TYPE; Schema: public; Owner: property_management_system_db_user
--

CREATE TYPE public."DocumentType" AS ENUM (
    'INVOICE',
    'RECEIPT',
    'LEASE_AGREEMENT',
    'OTHER'
);


ALTER TYPE public."DocumentType" OWNER TO property_management_system_db_user;

--
-- Name: EmployeeType; Type: TYPE; Schema: public; Owner: property_management_system_db_user
--

CREATE TYPE public."EmployeeType" AS ENUM (
    'FULL_TIME',
    'PART_TIME',
    'CONTRACT'
);


ALTER TYPE public."EmployeeType" OWNER TO property_management_system_db_user;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: property_management_system_db_user
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'CREDIT_CARD',
    'BANK_TRANSFER'
);


ALTER TYPE public."PaymentMethod" OWNER TO property_management_system_db_user;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: property_management_system_db_user
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED',
    'PROCESSING'
);


ALTER TYPE public."PaymentStatus" OWNER TO property_management_system_db_user;

--
-- Name: RequestStatus; Type: TYPE; Schema: public; Owner: property_management_system_db_user
--

CREATE TYPE public."RequestStatus" AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED'
);


ALTER TYPE public."RequestStatus" OWNER TO property_management_system_db_user;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: property_management_system_db_user
--

CREATE TYPE public."Role" AS ENUM (
    'manager',
    'admin',
    'client'
);


ALTER TYPE public."Role" OWNER TO property_management_system_db_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Apartment; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."Apartment" (
    id text NOT NULL,
    "buildingId" text NOT NULL,
    "complexId" text NOT NULL,
    "unitNumber" text NOT NULL,
    "rentAmount" numeric(65,30) NOT NULL,
    "numBedrooms" integer NOT NULL,
    "squareFootage" integer NOT NULL,
    "isAvailable" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Apartment" OWNER TO property_management_system_db_user;

--
-- Name: ApartmentComplex; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."ApartmentComplex" (
    id text NOT NULL,
    name text NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zipcode text NOT NULL
);


ALTER TABLE public."ApartmentComplex" OWNER TO property_management_system_db_user;

--
-- Name: Building; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."Building" (
    id text NOT NULL,
    "complexId" text NOT NULL,
    "buildingNumber" integer NOT NULL
);


ALTER TABLE public."Building" OWNER TO property_management_system_db_user;

--
-- Name: Document; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."Document" (
    id text NOT NULL,
    name text NOT NULL,
    "documentType" public."DocumentType" NOT NULL,
    "uploadedFile" text NOT NULL,
    "uploadedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Document" OWNER TO property_management_system_db_user;

--
-- Name: Employee; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."Employee" (
    id text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    "employeeType" public."EmployeeType" NOT NULL,
    salary numeric(65,30) NOT NULL,
    "hourlyRate" numeric(65,30),
    "startDate" timestamp(3) without time zone NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zipcode text NOT NULL
);


ALTER TABLE public."Employee" OWNER TO property_management_system_db_user;

--
-- Name: Lease; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."Lease" (
    id text NOT NULL,
    "apartmentId" text NOT NULL,
    "tenantId" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "monthlyRent" numeric(65,30) NOT NULL,
    "securityDeposit" numeric(65,30) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."Lease" OWNER TO property_management_system_db_user;

--
-- Name: MaintenanceRequest; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."MaintenanceRequest" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    description text NOT NULL,
    "requestDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status public."RequestStatus" DEFAULT 'PENDING'::public."RequestStatus" NOT NULL
);


ALTER TABLE public."MaintenanceRequest" OWNER TO property_management_system_db_user;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    "leaseId" text NOT NULL,
    "paymentAmount" numeric(65,30) NOT NULL,
    "paymentDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "paymentMethod" public."PaymentMethod" NOT NULL,
    "paymentStatus" public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "isLatePayment" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Payment" OWNER TO property_management_system_db_user;

--
-- Name: Payroll; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."Payroll" (
    id text NOT NULL,
    "employeeId" text NOT NULL,
    "payPeriodStart" timestamp(3) without time zone NOT NULL,
    "payPeriodEnd" timestamp(3) without time zone NOT NULL,
    "grossPay" numeric(65,30) NOT NULL,
    "stateTaxRate" numeric(65,30) DEFAULT 0.05 NOT NULL,
    "federalTaxRate" numeric(65,30) DEFAULT 0.10 NOT NULL,
    deductions numeric(65,30) DEFAULT 0.00 NOT NULL,
    "netPay" numeric(65,30) NOT NULL,
    "isPaid" boolean DEFAULT false NOT NULL,
    "paidOn" timestamp(3) without time zone
);


ALTER TABLE public."Payroll" OWNER TO property_management_system_db_user;

--
-- Name: Tenant; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."Tenant" (
    id text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    "phoneNumber" text NOT NULL,
    "dateOfBirth" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Tenant" OWNER TO property_management_system_db_user;

--
-- Name: User; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL
);


ALTER TABLE public."User" OWNER TO property_management_system_db_user;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: property_management_system_db_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO property_management_system_db_user;

--
-- Data for Name: Apartment; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."Apartment" (id, "buildingId", "complexId", "unitNumber", "rentAmount", "numBedrooms", "squareFootage", "isAvailable") FROM stdin;
73a1d8dc-7ad4-4991-a762-f6778c4fb632	31ed049e-a7f4-41ab-a3c4-911a29eb72ab	0b9730b0-0288-472c-b5a2-d0085c21a664	101	1200.000000000000000000000000000000	1	1100	t
91fb9f78-f4cd-4737-b28e-237aa6b92ada	31ed049e-a7f4-41ab-a3c4-911a29eb72ab	0b9730b0-0288-472c-b5a2-d0085c21a664	102	1500.000000000000000000000000000000	1	1600	t
001170bc-d310-4cfb-acdb-8ac8c977656d	31ed049e-a7f4-41ab-a3c4-911a29eb72ab	0b9730b0-0288-472c-b5a2-d0085c21a664	104	2200.000000000000000000000000000000	2	2200	t
21a10675-261a-45af-ba2b-b6d9001184e1	cba51733-51fd-4c67-87a8-50adb4fb1cd3	0b9730b0-0288-472c-b5a2-d0085c21a664	103	1800.000000000000000000000000000000	2	1800	t
5d22266d-3aea-4659-a1b5-dbb6fa0486e2	cba51733-51fd-4c67-87a8-50adb4fb1cd3	0b9730b0-0288-472c-b5a2-d0085c21a664	105	2500.000000000000000000000000000000	3	2500	t
f6c24289-f3a5-456c-a4d5-9a8c082ba088	cba51733-51fd-4c67-87a8-50adb4fb1cd3	0b9730b0-0288-472c-b5a2-d0085c21a664	201	1200.000000000000000000000000000000	1	1100	t
37e84069-0ddb-422d-9eff-b20f3b6b043d	cba51733-51fd-4c67-87a8-50adb4fb1cd3	0b9730b0-0288-472c-b5a2-d0085c21a664	202	1500.000000000000000000000000000000	1	1600	t
e3c12688-505b-43c0-82c2-a178b4766646	cba51733-51fd-4c67-87a8-50adb4fb1cd3	0b9730b0-0288-472c-b5a2-d0085c21a664	203	1800.000000000000000000000000000000	2	1800	t
45ec78c0-8d96-497e-b284-40d6e7d95b13	cba51733-51fd-4c67-87a8-50adb4fb1cd3	0b9730b0-0288-472c-b5a2-d0085c21a664	204	2200.000000000000000000000000000000	2	2200	t
3a5c4ed4-f1b8-4480-ac9a-a50eb37396a9	cba51733-51fd-4c67-87a8-50adb4fb1cd3	0b9730b0-0288-472c-b5a2-d0085c21a664	205	2500.000000000000000000000000000000	3	2500	t
d484e1ea-545b-4c17-ba89-6d8ae81b177f	f7226749-c58c-476a-97da-82d67ec94237	0b9730b0-0288-472c-b5a2-d0085c21a664	301	1200.000000000000000000000000000000	1	1100	t
e398f97e-4635-4734-8eed-30e1ec0b3bcd	f7226749-c58c-476a-97da-82d67ec94237	0b9730b0-0288-472c-b5a2-d0085c21a664	302	1500.000000000000000000000000000000	1	1600	t
d4bca116-c0d5-4114-82e1-5c7cb762e174	f7226749-c58c-476a-97da-82d67ec94237	0b9730b0-0288-472c-b5a2-d0085c21a664	303	1800.000000000000000000000000000000	2	1800	t
e54d3c24-19f7-4d0b-9bda-7d8ef7cb526e	f7226749-c58c-476a-97da-82d67ec94237	0b9730b0-0288-472c-b5a2-d0085c21a664	304	2200.000000000000000000000000000000	2	2200	t
d369f675-2166-4f6f-a3d6-aaf6ba5db334	f7226749-c58c-476a-97da-82d67ec94237	0b9730b0-0288-472c-b5a2-d0085c21a664	305	2500.000000000000000000000000000000	3	2500	t
39f445b8-d9e4-4045-b4ec-24c3ed9417cd	51881716-0b98-4456-acf7-fd6e7d57f999	0b9730b0-0288-472c-b5a2-d0085c21a664	401	1200.000000000000000000000000000000	1	1100	t
02ec6531-f756-449c-8a15-22299db27bef	51881716-0b98-4456-acf7-fd6e7d57f999	0b9730b0-0288-472c-b5a2-d0085c21a664	402	1500.000000000000000000000000000000	1	1600	t
a0447572-52d7-41ef-9e39-1ad5491a5737	51881716-0b98-4456-acf7-fd6e7d57f999	0b9730b0-0288-472c-b5a2-d0085c21a664	403	1800.000000000000000000000000000000	2	1800	t
7ab020aa-ba85-4bdc-90de-4297e7911c9c	51881716-0b98-4456-acf7-fd6e7d57f999	0b9730b0-0288-472c-b5a2-d0085c21a664	404	2200.000000000000000000000000000000	2	2200	t
df8b987e-4cb7-4c34-92a0-bf7ed411c66d	51881716-0b98-4456-acf7-fd6e7d57f999	0b9730b0-0288-472c-b5a2-d0085c21a664	405	2500.000000000000000000000000000000	3	2500	t
614462f5-f27d-403e-914f-f8f4398b7c3f	66aab2e2-4513-47b0-8500-bf0a72a9d6e0	0b9730b0-0288-472c-b5a2-d0085c21a664	501	1200.000000000000000000000000000000	1	1100	t
5046226b-fd0a-4468-8ae5-9af11ed72872	66aab2e2-4513-47b0-8500-bf0a72a9d6e0	0b9730b0-0288-472c-b5a2-d0085c21a664	502	1500.000000000000000000000000000000	1	1600	t
e2446fe8-9b71-47d6-9e45-574cab44ad5b	66aab2e2-4513-47b0-8500-bf0a72a9d6e0	0b9730b0-0288-472c-b5a2-d0085c21a664	503	1800.000000000000000000000000000000	2	1800	t
f57bd906-4624-4a8a-a103-c9e6aa81dc5b	66aab2e2-4513-47b0-8500-bf0a72a9d6e0	0b9730b0-0288-472c-b5a2-d0085c21a664	504	2200.000000000000000000000000000000	2	2200	t
8698c618-2735-45ae-b30d-415ce4516fd0	66aab2e2-4513-47b0-8500-bf0a72a9d6e0	0b9730b0-0288-472c-b5a2-d0085c21a664	505	2500.000000000000000000000000000000	3	2500	t
\.


--
-- Data for Name: ApartmentComplex; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."ApartmentComplex" (id, name, street, city, state, zipcode) FROM stdin;
0b9730b0-0288-472c-b5a2-d0085c21a664	Sun Set Height	2025 Full Stack Developer	Atlanta	Georgia	30349
\.


--
-- Data for Name: Building; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."Building" (id, "complexId", "buildingNumber") FROM stdin;
31ed049e-a7f4-41ab-a3c4-911a29eb72ab	0b9730b0-0288-472c-b5a2-d0085c21a664	100
cba51733-51fd-4c67-87a8-50adb4fb1cd3	0b9730b0-0288-472c-b5a2-d0085c21a664	200
f7226749-c58c-476a-97da-82d67ec94237	0b9730b0-0288-472c-b5a2-d0085c21a664	300
51881716-0b98-4456-acf7-fd6e7d57f999	0b9730b0-0288-472c-b5a2-d0085c21a664	400
66aab2e2-4513-47b0-8500-bf0a72a9d6e0	0b9730b0-0288-472c-b5a2-d0085c21a664	500
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."Document" (id, name, "documentType", "uploadedFile", "uploadedAt") FROM stdin;
\.


--
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."Employee" (id, "firstName", "lastName", email, phone, "employeeType", salary, "hourlyRate", "startDate", street, city, state, zipcode) FROM stdin;
\.


--
-- Data for Name: Lease; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."Lease" (id, "apartmentId", "tenantId", "startDate", "endDate", "monthlyRent", "securityDeposit", "isActive") FROM stdin;
1e341c5e-110f-45a1-858c-50d431736254	d369f675-2166-4f6f-a3d6-aaf6ba5db334	b71da61f-bd75-48b8-8301-5098055c0adb	2025-01-04 00:00:00	2026-01-04 00:00:00	2500.000000000000000000000000000000	1000.000000000000000000000000000000	t
85362e55-ef3c-44cd-b683-3b0368b8b275	7ab020aa-ba85-4bdc-90de-4297e7911c9c	6df062c2-1d99-4217-9c19-6b3d3067524f	2025-03-20 00:00:00	2026-03-20 00:00:00	2200.000000000000000000000000000000	1000.000000000000000000000000000000	t
c7a752df-e21e-4fe6-bfc0-60995136142c	f57bd906-4624-4a8a-a103-c9e6aa81dc5b	eb8e3b4d-5790-4e48-ad9a-b58130552d88	2025-02-20 00:00:00	2026-02-20 00:00:00	2200.000000000000000000000000000000	1000.000000000000000000000000000000	t
51de2355-4ed0-4a71-9a55-89ea4ac2b535	5d22266d-3aea-4659-a1b5-dbb6fa0486e2	12edc90b-f672-4224-9bd0-612007fb867a	2025-02-27 00:00:00	2026-02-27 00:00:00	2500.000000000000000000000000000000	1000.000000000000000000000000000000	t
00e3d2ce-bc03-43c3-aba8-5d1f7c7f7bf1	e2446fe8-9b71-47d6-9e45-574cab44ad5b	93986293-f2e9-4b0d-9d58-db4d31537a85	2025-01-15 00:00:00	2026-01-15 00:00:00	1800.000000000000000000000000000000	1000.000000000000000000000000000000	t
21fc5e14-fe01-4642-b921-b4673d2cf8fb	5046226b-fd0a-4468-8ae5-9af11ed72872	17954b20-e403-44ed-8cbd-3e0d80d25329	2025-01-15 00:00:00	2026-01-15 00:00:00	1600.000000000000000000000000000000	1000.000000000000000000000000000000	t
fa2c1ff8-6365-4e94-bf05-17d8e99776f6	614462f5-f27d-403e-914f-f8f4398b7c3f	67d86ee8-2915-4991-823c-206ffd10bb43	2025-01-15 00:00:00	2026-01-15 00:00:00	1100.000000000000000000000000000000	1000.000000000000000000000000000000	t
cae2af62-4eb6-43b1-9362-0ef0ab60fd1a	a0447572-52d7-41ef-9e39-1ad5491a5737	6bf44693-72ea-4ea6-b3cf-2fa83a142eee	2025-01-15 00:00:00	2026-01-15 00:00:00	1800.000000000000000000000000000000	1000.000000000000000000000000000000	t
b2549e1f-ba8e-4974-b543-6e74507467b5	02ec6531-f756-449c-8a15-22299db27bef	af053758-3a4b-4296-92c5-50c2c9052879	2025-01-15 00:00:00	2026-01-15 00:00:00	1600.000000000000000000000000000000	1000.000000000000000000000000000000	t
66e8d3dc-d44c-406b-a4d8-25675edd0bf0	39f445b8-d9e4-4045-b4ec-24c3ed9417cd	835a0efc-76f4-4aed-9869-9ee132d91918	2025-01-15 00:00:00	2026-01-15 00:00:00	1100.000000000000000000000000000000	1000.000000000000000000000000000000	t
2c1f74c4-e86e-4ece-97fa-a1b3d5240932	d4bca116-c0d5-4114-82e1-5c7cb762e174	2192486a-f020-4ea8-b467-c68dc3b79cc2	2025-01-15 00:00:00	2026-01-15 00:00:00	1800.000000000000000000000000000000	1000.000000000000000000000000000000	t
c7f20698-f0c6-4c05-8d80-6940f3f2eade	e398f97e-4635-4734-8eed-30e1ec0b3bcd	59b56079-e3a9-4568-9103-41bf9c5b3d55	2025-01-15 00:00:00	2026-01-15 00:00:00	1600.000000000000000000000000000000	1000.000000000000000000000000000000	t
60f8dc45-f502-4a70-8d28-277bb67234e6	d484e1ea-545b-4c17-ba89-6d8ae81b177f	47756238-67f7-4a22-aa7d-7a5c9e1c66c4	2025-01-15 00:00:00	2026-01-15 00:00:00	1100.000000000000000000000000000000	1000.000000000000000000000000000000	t
d1eafd7b-7ff9-42c4-98d1-f246f9796ed7	e3c12688-505b-43c0-82c2-a178b4766646	847790c7-5970-4fc7-9e5a-6ea8730b00cb	2025-01-15 00:00:00	2026-01-15 00:00:00	1800.000000000000000000000000000000	1000.000000000000000000000000000000	t
7960605a-6946-4c30-9a6b-cf4d4175f9d0	37e84069-0ddb-422d-9eff-b20f3b6b043d	ee6dfc32-3a13-45bd-9226-cd3b8dafe64c	2025-01-14 00:00:00	2026-01-14 00:00:00	1600.000000000000000000000000000000	1000.000000000000000000000000000000	t
e2bf190e-c33d-443c-bae9-d250a00ebb81	f6c24289-f3a5-456c-a4d5-9a8c082ba088	07ad22df-92f3-4fca-ae47-c3d32c8d14c2	2025-01-19 00:00:00	2026-01-19 00:00:00	1100.000000000000000000000000000000	1000.000000000000000000000000000000	t
627c30d8-d8e2-4fc4-bd24-5e894428bc86	21a10675-261a-45af-ba2b-b6d9001184e1	1c42c275-4b6a-41d1-9d9b-063502576a95	2025-01-10 00:00:00	2026-01-10 00:00:00	1800.000000000000000000000000000000	1000.000000000000000000000000000000	t
a4b5bd87-21e9-4cf1-b995-8fdc2ee489fb	91fb9f78-f4cd-4737-b28e-237aa6b92ada	ca657115-3de9-4e19-bbcb-909b25719f6c	2025-01-15 00:00:00	2026-01-15 00:00:00	1600.000000000000000000000000000000	1000.000000000000000000000000000000	t
6c146500-84c4-4447-9276-6b0dbc7594c0	73a1d8dc-7ad4-4991-a762-f6778c4fb632	23892745-f89b-4ff9-96f5-a1fde8e43ec8	2025-01-15 00:00:00	2025-01-15 00:00:00	1100.000000000000000000000000000000	1000.000000000000000000000000000000	t
\.


--
-- Data for Name: MaintenanceRequest; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."MaintenanceRequest" (id, "tenantId", description, "requestDate", status) FROM stdin;
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."Payment" (id, "leaseId", "paymentAmount", "paymentDate", "paymentMethod", "paymentStatus", "isLatePayment") FROM stdin;
0ea60357-318c-445d-a5c3-dafab552d28f	51de2355-4ed0-4a71-9a55-89ea4ac2b535	2500.000000000000000000000000000000	2025-05-27 00:00:00	BANK_TRANSFER	PENDING	f
6a6e672a-20d8-4ed5-a526-1b53a5391226	51de2355-4ed0-4a71-9a55-89ea4ac2b535	2500.000000000000000000000000000000	2025-04-27 00:00:00	BANK_TRANSFER	PENDING	f
c08bf74d-b7fd-42aa-9342-54fe1bca1e61	51de2355-4ed0-4a71-9a55-89ea4ac2b535	2500.000000000000000000000000000000	2025-03-27 00:00:00	BANK_TRANSFER	PENDING	f
b8de2064-c77c-4909-90c8-364fc510f906	c7a752df-e21e-4fe6-bfc0-60995136142c	2200.000000000000000000000000000000	2025-05-20 00:00:00	CREDIT_CARD	COMPLETED	f
c0b0c992-a5b0-45b1-9eed-2b0ebd001a44	c7a752df-e21e-4fe6-bfc0-60995136142c	2200.000000000000000000000000000000	2025-04-20 00:00:00	CREDIT_CARD	COMPLETED	f
89342160-4736-47bc-82c0-f7c49e40a265	c7a752df-e21e-4fe6-bfc0-60995136142c	2200.000000000000000000000000000000	2025-03-20 00:00:00	CREDIT_CARD	COMPLETED	f
cf438c4d-6827-4535-9ada-de86879485d6	85362e55-ef3c-44cd-b683-3b0368b8b275	2200.000000000000000000000000000000	2025-05-20 00:00:00	BANK_TRANSFER	COMPLETED	f
568ffc1d-745b-47df-b00a-02f80a4c546b	85362e55-ef3c-44cd-b683-3b0368b8b275	2200.000000000000000000000000000000	2025-04-20 00:00:00	BANK_TRANSFER	COMPLETED	f
bf04f256-3772-447d-845a-a7e9478605a3	1e341c5e-110f-45a1-858c-50d431736254	2025.000000000000000000000000000000	2025-05-01 00:00:00	CREDIT_CARD	COMPLETED	f
83334ab0-cd01-4f77-9164-aa3cb80413e3	00e3d2ce-bc03-43c3-aba8-5d1f7c7f7bf1	1800.000000000000000000000000000000	2025-05-15 00:00:00	CREDIT_CARD	COMPLETED	f
6c9fba3a-35dd-4de3-9e7e-3af2b46f9cbc	00e3d2ce-bc03-43c3-aba8-5d1f7c7f7bf1	1800.000000000000000000000000000000	2025-04-15 00:00:00	CREDIT_CARD	COMPLETED	f
a3f0b77f-6947-4433-a141-fdd21ff3a516	00e3d2ce-bc03-43c3-aba8-5d1f7c7f7bf1	1800.000000000000000000000000000000	2025-03-15 00:00:00	CREDIT_CARD	COMPLETED	f
ecc015c7-d23a-4e70-ba69-614fd87c0372	00e3d2ce-bc03-43c3-aba8-5d1f7c7f7bf1	1800.000000000000000000000000000000	2025-02-15 00:00:00	CREDIT_CARD	COMPLETED	f
589ee74c-a112-4eb7-afe1-79974daaaafb	21fc5e14-fe01-4642-b921-b4673d2cf8fb	1600.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
31c23ac8-fd4e-40cd-8212-c84990cfc091	21fc5e14-fe01-4642-b921-b4673d2cf8fb	1600.000000000000000000000000000000	2025-04-15 00:00:00	BANK_TRANSFER	COMPLETED	f
ade3a122-6b7d-4001-b83d-9ef7d68fffa8	21fc5e14-fe01-4642-b921-b4673d2cf8fb	1600.000000000000000000000000000000	2025-03-15 00:00:00	BANK_TRANSFER	COMPLETED	f
047c96f4-a827-4fd0-83e9-dbf9e66fed28	21fc5e14-fe01-4642-b921-b4673d2cf8fb	1600.000000000000000000000000000000	2025-02-15 00:00:00	BANK_TRANSFER	COMPLETED	f
c0ad8e56-031f-4f8b-bbdc-552097534616	fa2c1ff8-6365-4e94-bf05-17d8e99776f6	1100.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
98d7a79d-9c9a-469d-81d1-cb56a45a66d6	fa2c1ff8-6365-4e94-bf05-17d8e99776f6	1100.000000000000000000000000000000	2025-04-15 00:00:00	BANK_TRANSFER	COMPLETED	f
ef48cbe3-897f-4896-aa1f-101c63af511c	fa2c1ff8-6365-4e94-bf05-17d8e99776f6	1100.000000000000000000000000000000	2025-03-15 00:00:00	BANK_TRANSFER	COMPLETED	f
de097c37-87af-4e3d-9462-51e649202fda	fa2c1ff8-6365-4e94-bf05-17d8e99776f6	1100.000000000000000000000000000000	2025-02-15 00:00:00	BANK_TRANSFER	COMPLETED	f
c5007d52-9949-459a-a1bd-94e40db46aa3	cae2af62-4eb6-43b1-9362-0ef0ab60fd1a	1800.000000000000000000000000000000	2025-05-15 00:00:00	CREDIT_CARD	COMPLETED	f
48736c7b-5076-4c6d-a187-84afd669738c	cae2af62-4eb6-43b1-9362-0ef0ab60fd1a	1800.000000000000000000000000000000	2025-04-15 00:00:00	CREDIT_CARD	COMPLETED	f
e0b25b62-a350-4aad-b47f-f45990badc36	cae2af62-4eb6-43b1-9362-0ef0ab60fd1a	1800.000000000000000000000000000000	2025-03-15 00:00:00	CREDIT_CARD	COMPLETED	f
dfb65abf-a036-4d39-a896-4cc5b34c1542	cae2af62-4eb6-43b1-9362-0ef0ab60fd1a	1800.000000000000000000000000000000	2025-02-15 00:00:00	CREDIT_CARD	COMPLETED	f
b9d3c2c2-e81b-44bd-835a-94159ac9e6f2	b2549e1f-ba8e-4974-b543-6e74507467b5	1600.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
5c135f16-edc9-4cb3-968e-32541bef81eb	b2549e1f-ba8e-4974-b543-6e74507467b5	1600.000000000000000000000000000000	2025-04-15 00:00:00	BANK_TRANSFER	COMPLETED	f
aff203fb-93d0-4e8d-a1f1-4e4733af511f	b2549e1f-ba8e-4974-b543-6e74507467b5	1600.000000000000000000000000000000	2025-03-15 00:00:00	BANK_TRANSFER	COMPLETED	f
e8a24d82-81ed-45cf-a1b3-6143a436f2f8	b2549e1f-ba8e-4974-b543-6e74507467b5	1600.000000000000000000000000000000	2025-02-15 00:00:00	BANK_TRANSFER	COMPLETED	f
da276169-0136-471d-949c-3d244ad66588	66e8d3dc-d44c-406b-a4d8-25675edd0bf0	1100.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
66aca6d3-a130-4ec2-bc5f-10acf37f2f9a	66e8d3dc-d44c-406b-a4d8-25675edd0bf0	1100.000000000000000000000000000000	2025-04-15 00:00:00	CREDIT_CARD	COMPLETED	f
7af7e375-272e-4581-ad49-ad54d51469e1	66e8d3dc-d44c-406b-a4d8-25675edd0bf0	1100.000000000000000000000000000000	2025-03-15 00:00:00	CREDIT_CARD	COMPLETED	f
b360c170-36c4-4dab-8dae-6bb1f551e1cc	66e8d3dc-d44c-406b-a4d8-25675edd0bf0	1100.000000000000000000000000000000	2025-02-15 00:00:00	CREDIT_CARD	COMPLETED	f
52152f23-68a3-4bbf-8905-19270c833dcc	2c1f74c4-e86e-4ece-97fa-a1b3d5240932	1800.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
f97ab1dc-de2f-4260-b900-e9cf6f73ff1b	2c1f74c4-e86e-4ece-97fa-a1b3d5240932	1800.000000000000000000000000000000	2025-04-15 00:00:00	BANK_TRANSFER	COMPLETED	f
1dfdb022-b1f2-47f5-a650-6566af895b24	2c1f74c4-e86e-4ece-97fa-a1b3d5240932	1800.000000000000000000000000000000	2025-03-15 00:00:00	BANK_TRANSFER	COMPLETED	f
8f8e6274-f520-4dad-93dc-5d641c6dc78c	2c1f74c4-e86e-4ece-97fa-a1b3d5240932	1800.000000000000000000000000000000	2025-02-15 00:00:00	CREDIT_CARD	COMPLETED	f
9b30e3ea-777e-469c-814a-6ec5912ec565	c7f20698-f0c6-4c05-8d80-6940f3f2eade	1600.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
4d1d0c75-a3f4-46ea-a4a4-a71bb34217fe	c7f20698-f0c6-4c05-8d80-6940f3f2eade	1600.000000000000000000000000000000	2025-04-15 00:00:00	BANK_TRANSFER	COMPLETED	f
166a0cee-642e-4d84-ba8f-1a2e719146a1	c7f20698-f0c6-4c05-8d80-6940f3f2eade	1600.000000000000000000000000000000	2025-03-15 00:00:00	BANK_TRANSFER	COMPLETED	f
a03dd494-7c8a-4722-beea-49acd4ebe671	c7f20698-f0c6-4c05-8d80-6940f3f2eade	1600.000000000000000000000000000000	2025-02-15 00:00:00	BANK_TRANSFER	COMPLETED	f
f1df849c-0577-455b-b8cd-59bf84eb4f36	60f8dc45-f502-4a70-8d28-277bb67234e6	1100.000000000000000000000000000000	2025-05-15 00:00:00	CREDIT_CARD	COMPLETED	f
a79fae20-e5c7-409e-b12e-cb841fa0d9f9	60f8dc45-f502-4a70-8d28-277bb67234e6	1100.000000000000000000000000000000	2025-04-15 00:00:00	CREDIT_CARD	COMPLETED	f
3faf0ab2-6ef6-4398-b637-3748a74b2435	60f8dc45-f502-4a70-8d28-277bb67234e6	1100.000000000000000000000000000000	2025-03-15 00:00:00	CREDIT_CARD	COMPLETED	f
df013f55-7786-4d82-b1b7-d4a8876bcb07	60f8dc45-f502-4a70-8d28-277bb67234e6	1100.000000000000000000000000000000	2025-02-15 00:00:00	CREDIT_CARD	COMPLETED	f
45ef7b9e-d467-4e50-8c2a-01cf7b184907	d1eafd7b-7ff9-42c4-98d1-f246f9796ed7	1800.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
41564ce6-9fb5-4de5-8e02-ee661ce61150	d1eafd7b-7ff9-42c4-98d1-f246f9796ed7	1800.000000000000000000000000000000	2025-04-15 00:00:00	BANK_TRANSFER	COMPLETED	f
11e2bffc-3128-4534-812d-aa946a693883	d1eafd7b-7ff9-42c4-98d1-f246f9796ed7	1800.000000000000000000000000000000	2025-03-15 00:00:00	CREDIT_CARD	COMPLETED	f
38dcaac7-2110-467f-ab61-34401637053f	d1eafd7b-7ff9-42c4-98d1-f246f9796ed7	1800.000000000000000000000000000000	2025-02-15 00:00:00	CREDIT_CARD	COMPLETED	f
59ec900f-3b36-4bcc-a242-a45f7ff27e04	7960605a-6946-4c30-9a6b-cf4d4175f9d0	1600.000000000000000000000000000000	2025-05-14 00:00:00	CREDIT_CARD	COMPLETED	f
72da9cc9-48e4-454e-9aae-d641fdb5c501	7960605a-6946-4c30-9a6b-cf4d4175f9d0	1600.000000000000000000000000000000	2025-04-14 00:00:00	CREDIT_CARD	COMPLETED	f
ce795fbf-7315-49a5-9fd3-5cb2bc4343f4	7960605a-6946-4c30-9a6b-cf4d4175f9d0	1600.000000000000000000000000000000	2025-03-14 00:00:00	CREDIT_CARD	COMPLETED	f
6abfa52c-30b5-401f-8a82-275daf72f9ea	7960605a-6946-4c30-9a6b-cf4d4175f9d0	1600.000000000000000000000000000000	2025-02-14 00:00:00	CREDIT_CARD	COMPLETED	f
1aca21b5-be1b-4780-8347-c509ab6a0bea	e2bf190e-c33d-443c-bae9-d250a00ebb81	1100.000000000000000000000000000000	2025-05-19 00:00:00	CREDIT_CARD	COMPLETED	f
21f8a109-65ed-4087-b429-2d9386e833e6	e2bf190e-c33d-443c-bae9-d250a00ebb81	1100.000000000000000000000000000000	2025-04-19 00:00:00	CREDIT_CARD	COMPLETED	f
5dac81a9-3f5f-4af7-8ee1-306b9999b53f	e2bf190e-c33d-443c-bae9-d250a00ebb81	1100.000000000000000000000000000000	2025-03-19 00:00:00	BANK_TRANSFER	COMPLETED	f
f0e4e70b-17b5-4be8-bdf4-765c46cf53b2	e2bf190e-c33d-443c-bae9-d250a00ebb81	1100.000000000000000000000000000000	2025-02-19 00:00:00	BANK_TRANSFER	COMPLETED	f
6eef8af7-7b74-49aa-88de-0dfcfec41d78	627c30d8-d8e2-4fc4-bd24-5e894428bc86	1800.000000000000000000000000000000	2025-05-10 00:00:00	BANK_TRANSFER	COMPLETED	f
ed315582-9856-4c45-a97c-b44caa9e3ba9	627c30d8-d8e2-4fc4-bd24-5e894428bc86	1800.000000000000000000000000000000	2025-04-10 00:00:00	BANK_TRANSFER	COMPLETED	f
2186bf7e-8d02-42b0-97ce-78ccd9ec253b	627c30d8-d8e2-4fc4-bd24-5e894428bc86	1800.000000000000000000000000000000	2025-03-10 00:00:00	BANK_TRANSFER	COMPLETED	f
e98e5657-686c-4e1d-8b91-477c45f6a582	627c30d8-d8e2-4fc4-bd24-5e894428bc86	1800.000000000000000000000000000000	2025-02-10 00:00:00	BANK_TRANSFER	COMPLETED	f
d3d64001-8f6a-498f-b9c9-6a37d779cda9	a4b5bd87-21e9-4cf1-b995-8fdc2ee489fb	1600.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
07fc3a15-4ce1-4d0e-9366-917b3ee18a12	a4b5bd87-21e9-4cf1-b995-8fdc2ee489fb	1600.000000000000000000000000000000	2025-04-15 00:00:00	BANK_TRANSFER	COMPLETED	f
5b094245-1635-40e6-84ac-33ee3f12740c	a4b5bd87-21e9-4cf1-b995-8fdc2ee489fb	1600.000000000000000000000000000000	2025-03-15 00:00:00	BANK_TRANSFER	COMPLETED	f
e8e9f0cf-6f31-4747-b767-2b57c79eecb7	a4b5bd87-21e9-4cf1-b995-8fdc2ee489fb	1600.000000000000000000000000000000	2025-02-15 00:00:00	BANK_TRANSFER	COMPLETED	f
fb19da4c-9821-4624-be3b-a2797fdd01cb	6c146500-84c4-4447-9276-6b0dbc7594c0	1100.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
0b88738f-2d86-4f89-a6b6-5cfe7376c322	6c146500-84c4-4447-9276-6b0dbc7594c0	1100.000000000000000000000000000000	2025-04-15 00:00:00	BANK_TRANSFER	COMPLETED	f
8e90c68b-2419-4a57-8a2b-82dbd72a695f	6c146500-84c4-4447-9276-6b0dbc7594c0	1100.000000000000000000000000000000	2025-05-15 00:00:00	BANK_TRANSFER	COMPLETED	f
adac91e4-978e-4269-b584-48efd2371054	6c146500-84c4-4447-9276-6b0dbc7594c0	1100.000000000000000000000000000000	2025-02-15 00:00:00	BANK_TRANSFER	COMPLETED	f
213d3679-51c1-4dd9-8c91-0a56de900027	6c146500-84c4-4447-9276-6b0dbc7594c0	1100.000000000000000000000000000000	2025-06-15 00:00:00	BANK_TRANSFER	COMPLETED	f
be8d22c7-3657-4b22-ae86-4dc7bcda33f3	a4b5bd87-21e9-4cf1-b995-8fdc2ee489fb	1600.000000000000000000000000000000	2025-06-15 00:00:00	BANK_TRANSFER	COMPLETED	f
f16d0696-f46c-4ebb-bc0e-660e28bdf47c	627c30d8-d8e2-4fc4-bd24-5e894428bc86	1800.000000000000000000000000000000	2025-06-10 00:00:00	BANK_TRANSFER	COMPLETED	f
2c5b8177-a31c-44fc-88ea-fe62e48adfaf	e2bf190e-c33d-443c-bae9-d250a00ebb81	1100.000000000000000000000000000000	2025-06-19 00:00:00	BANK_TRANSFER	COMPLETED	f
118e86d9-b999-4800-9d21-65ea3ef0c18a	7960605a-6946-4c30-9a6b-cf4d4175f9d0	1600.000000000000000000000000000000	2025-06-14 00:00:00	CREDIT_CARD	COMPLETED	f
57acccf3-5312-45cb-9fe0-0f5ac02c91d4	d1eafd7b-7ff9-42c4-98d1-f246f9796ed7	1800.000000000000000000000000000000	2025-06-15 00:00:00	CREDIT_CARD	COMPLETED	f
aa2eabee-6a13-40b5-bbf0-8c2743993d5d	60f8dc45-f502-4a70-8d28-277bb67234e6	1100.000000000000000000000000000000	2025-06-15 00:00:00	CREDIT_CARD	COMPLETED	f
5a28d652-40e9-47da-9323-b65a1eb4debb	c7f20698-f0c6-4c05-8d80-6940f3f2eade	1600.000000000000000000000000000000	2025-06-15 00:00:00	BANK_TRANSFER	COMPLETED	f
13de487d-7aa0-4431-8cbe-74a735f92251	2c1f74c4-e86e-4ece-97fa-a1b3d5240932	1800.000000000000000000000000000000	2025-06-15 00:00:00	BANK_TRANSFER	COMPLETED	f
eac8c504-d5f2-4422-bba8-d4139e9c5671	2c1f74c4-e86e-4ece-97fa-a1b3d5240932	1800.000000000000000000000000000000	2025-06-15 00:00:00	BANK_TRANSFER	COMPLETED	f
620924e6-54d0-4606-a724-1f93981de4ec	66e8d3dc-d44c-406b-a4d8-25675edd0bf0	1100.000000000000000000000000000000	2025-06-15 00:00:00	CREDIT_CARD	COMPLETED	f
e96c3656-a9f5-4c7a-b07a-f75a61d3b94b	b2549e1f-ba8e-4974-b543-6e74507467b5	1600.000000000000000000000000000000	2025-06-15 00:00:00	BANK_TRANSFER	COMPLETED	f
ed4c0ed5-5850-4979-b04d-431162ac27fa	cae2af62-4eb6-43b1-9362-0ef0ab60fd1a	1800.000000000000000000000000000000	2025-06-15 00:00:00	CREDIT_CARD	COMPLETED	f
188e0366-e848-4c09-8b4e-c01c1a040def	fa2c1ff8-6365-4e94-bf05-17d8e99776f6	1100.000000000000000000000000000000	2025-06-15 00:00:00	BANK_TRANSFER	COMPLETED	f
4329665b-3d8b-4545-966e-39e16c30c35b	21fc5e14-fe01-4642-b921-b4673d2cf8fb	1600.000000000000000000000000000000	2025-06-15 00:00:00	BANK_TRANSFER	COMPLETED	f
4c2457f4-763e-4a59-9e87-978898a83bba	00e3d2ce-bc03-43c3-aba8-5d1f7c7f7bf1	1800.000000000000000000000000000000	2025-06-15 00:00:00	CREDIT_CARD	COMPLETED	f
c853259d-4286-4277-ba56-549d9db3497f	1e341c5e-110f-45a1-858c-50d431736254	2025.000000000000000000000000000000	2025-06-01 00:00:00	CREDIT_CARD	COMPLETED	f
fa6f52a1-5821-4412-921a-b1f336d298ba	85362e55-ef3c-44cd-b683-3b0368b8b275	2200.000000000000000000000000000000	2025-06-20 00:00:00	BANK_TRANSFER	COMPLETED	f
5282d56d-2ae7-4516-9ecb-82745cdd009a	c7a752df-e21e-4fe6-bfc0-60995136142c	2200.000000000000000000000000000000	2025-06-20 00:00:00	CREDIT_CARD	COMPLETED	f
24ee5af0-3fad-4175-b77d-0da5181a3f14	51de2355-4ed0-4a71-9a55-89ea4ac2b535	2025.000000000000000000000000000000	2025-06-27 00:00:00	CREDIT_CARD	COMPLETED	f
\.


--
-- Data for Name: Payroll; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."Payroll" (id, "employeeId", "payPeriodStart", "payPeriodEnd", "grossPay", "stateTaxRate", "federalTaxRate", deductions, "netPay", "isPaid", "paidOn") FROM stdin;
\.


--
-- Data for Name: Tenant; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."Tenant" (id, "firstName", "lastName", email, "phoneNumber", "dateOfBirth") FROM stdin;
2192486a-f020-4ea8-b467-c68dc3b79cc2	Alice	Johnson	alicejohnson@gmail.com	(555) 345-5453	1988-01-15 00:00:00
93986293-f2e9-4b0d-9d58-db4d31537a85	Mark	Lee	marklee@gmail.com	(555) 555-9877	1999-07-07 00:00:00
23892745-f89b-4ff9-96f5-a1fde8e43ec8	Sarah	Adams	sarahadams@gmail.com	(555) 765-2345	1990-07-19 00:00:00
835a0efc-76f4-4aed-9869-9ee132d91918	James	White	jameswhite@gmail.com	(555) 456-4532	2002-01-15 00:00:00
ca657115-3de9-4e19-bbcb-909b25719f6c	Emily	Baker	emilybaker@gmail.com	(555) 789-2345	1995-01-15 00:00:00
17954b20-e403-44ed-8cbd-3e0d80d25329	Victor	Chang	victorchang@gmail.com	(555) 012-7765	1998-04-15 00:00:00
1c42c275-4b6a-41d1-9d9b-063502576a95	Bob	Smith	bobsmith@gmail.com	(555) 467-1891	1993-08-28 00:00:00
847790c7-5970-4fc7-9e5a-6ea8730b00cb	Carol	Davis	caroldavis@gmail.com	(555) 456-7892	1991-01-10 00:00:00
47756238-67f7-4a22-aa7d-7a5c9e1c66c4	David	Wilson	davidwilson@gmail.com	(123) 456-7893	1992-11-29 00:00:00
59b56079-e3a9-4568-9103-41bf9c5b3d55	Eva	Martinez	evamartinez@gmail.com	(123) 456-7894	2001-01-04 00:00:00
af053758-3a4b-4296-92c5-50c2c9052879	Frank	Thompson	frankthompson@gmail.com	(123) 456-7895	1997-08-30 00:00:00
6bf44693-72ea-4ea6-b3cf-2fa83a142eee	Grace	Lee	gracelee@gmail.com	(123) 456-7896	1999-05-22 00:00:00
67d86ee8-2915-4991-823c-206ffd10bb43	Henry	Clark	henryclark@gmail.com	(123) 456-7897	1994-06-30 00:00:00
07ad22df-92f3-4fca-ae47-c3d32c8d14c2	Ivy	Turner	ivyturner@gmail.com	(123) 456-7898	1991-05-23 00:00:00
ee6dfc32-3a13-45bd-9226-cd3b8dafe64c	Jack	Wilson	jackwilson@gmail.com	(123) 456-7899	1991-05-23 00:00:00
12edc90b-f672-4224-9bd0-612007fb867a	Brian	Martinez	brianmartinez@example.com	(555) 345-6781	1997-08-31 00:00:00
eb8e3b4d-5790-4e48-ad9a-b58130552d88	Cynthia	Nguyen	cynthianguyen@example.com	(555) 345-6789	1996-05-23 00:00:00
6df062c2-1d99-4217-9c19-6b3d3067524f	David	O'Connor	davidoconnor@example.com	(555) 456-7890	1998-12-18 00:00:00
b71da61f-bd75-48b8-8301-5098055c0adb	Ella	Patel	ellapatel@example.com	(555) 567-8901	1996-12-31 00:00:00
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public."User" (id, "firstName", "lastName", email, username, password, role) FROM stdin;
4d4fc9ef-b90e-4496-9d16-26590916133c	Mathew	correa	mathewcorrea19@gmail.com	Correa95	$2b$10$YV8l6VBc/siFqd6/6ojKJulCyImiQaI0gBcidOA71vcUbeBgPcZfa	manager
b1659f1a-cf0b-403b-be9c-3a6daa3f53ff	Pierre	Correa	pierrecorrea@gmail.com	Pierre	$2b$10$Gg6p2.3HOB1OGoEPcjBodu6UPAG2zQm4wKt2x7xKtdE/AKcAofxc2	client
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: property_management_system_db_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
45feb31a-adc2-4195-9d54-75b9a934f88a	a76f2512df8863acbd258082e5d51902f5fb82568b65615636481aeeec1aa981	2025-06-14 22:50:57.035711-04	20250615025056_add_payment_status	\N	\N	2025-06-14 22:50:56.942649-04	1
2cec39c5-a2a4-485f-b7d9-c9bebbba1c46	16aac30203f602e29ed14848c7c7626d603aa3e6fca4a5e3ffdc07994e928845	2025-06-16 11:46:21.012027-04	20250616154620_update_building_model	\N	\N	2025-06-16 11:46:20.989767-04	1
\.


--
-- Name: ApartmentComplex ApartmentComplex_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."ApartmentComplex"
    ADD CONSTRAINT "ApartmentComplex_pkey" PRIMARY KEY (id);


--
-- Name: Apartment Apartment_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Apartment"
    ADD CONSTRAINT "Apartment_pkey" PRIMARY KEY (id);


--
-- Name: Building Building_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Building"
    ADD CONSTRAINT "Building_pkey" PRIMARY KEY (id);


--
-- Name: Document Document_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_pkey" PRIMARY KEY (id);


--
-- Name: Employee Employee_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pkey" PRIMARY KEY (id);


--
-- Name: Lease Lease_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Lease"
    ADD CONSTRAINT "Lease_pkey" PRIMARY KEY (id);


--
-- Name: MaintenanceRequest MaintenanceRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."MaintenanceRequest"
    ADD CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Payroll Payroll_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Payroll"
    ADD CONSTRAINT "Payroll_pkey" PRIMARY KEY (id);


--
-- Name: Tenant Tenant_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Tenant"
    ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: ApartmentComplex_name_key; Type: INDEX; Schema: public; Owner: property_management_system_db_user
--

CREATE UNIQUE INDEX "ApartmentComplex_name_key" ON public."ApartmentComplex" USING btree (name);


--
-- Name: Building_complexId_buildingNumber_key; Type: INDEX; Schema: public; Owner: property_management_system_db_user
--

CREATE UNIQUE INDEX "Building_complexId_buildingNumber_key" ON public."Building" USING btree ("complexId", "buildingNumber");


--
-- Name: Employee_email_key; Type: INDEX; Schema: public; Owner: property_management_system_db_user
--

CREATE UNIQUE INDEX "Employee_email_key" ON public."Employee" USING btree (email);


--
-- Name: Lease_apartmentId_key; Type: INDEX; Schema: public; Owner: property_management_system_db_user
--

CREATE UNIQUE INDEX "Lease_apartmentId_key" ON public."Lease" USING btree ("apartmentId");


--
-- Name: Tenant_email_key; Type: INDEX; Schema: public; Owner: property_management_system_db_user
--

CREATE UNIQUE INDEX "Tenant_email_key" ON public."Tenant" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: property_management_system_db_user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: property_management_system_db_user
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Apartment Apartment_buildingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Apartment"
    ADD CONSTRAINT "Apartment_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES public."Building"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Apartment Apartment_complexId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Apartment"
    ADD CONSTRAINT "Apartment_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES public."ApartmentComplex"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Building Building_complexId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Building"
    ADD CONSTRAINT "Building_complexId_fkey" FOREIGN KEY ("complexId") REFERENCES public."ApartmentComplex"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Lease Lease_apartmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Lease"
    ADD CONSTRAINT "Lease_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES public."Apartment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Lease Lease_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Lease"
    ADD CONSTRAINT "Lease_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MaintenanceRequest MaintenanceRequest_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."MaintenanceRequest"
    ADD CONSTRAINT "MaintenanceRequest_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_leaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES public."Lease"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payroll Payroll_employeeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: property_management_system_db_user
--

ALTER TABLE ONLY public."Payroll"
    ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES public."Employee"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: property_management_system_db_user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

