--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Homebrew)
-- Dumped by pg_dump version 14.18 (Homebrew)

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
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'UPCOMING',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'NO_SHOW',
    'PENDING_APPROVAL',
    'EMERGENCY_HOLD',
    'REJECTED'
);


ALTER TYPE public."BookingStatus" OWNER TO tamimahzami;

--
-- Name: DutyStatus; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."DutyStatus" AS ENUM (
    'PLANNED',
    'ASSIGNED',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'SICK_LEAVE',
    'ON_BREAK',
    'UNAVAILABLE'
);


ALTER TYPE public."DutyStatus" OWNER TO tamimahzami;

--
-- Name: MaintenanceType; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."MaintenanceType" AS ENUM (
    'ROUTINE',
    'REPAIR',
    'INSPECTION',
    'ACCIDENT',
    'RECALL',
    'CLEANING',
    'SOFTWARE_UPDATE',
    'TIRE_CHANGE'
);


ALTER TYPE public."MaintenanceType" OWNER TO tamimahzami;

--
-- Name: PaymentMethodType; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."PaymentMethodType" AS ENUM (
    'CREDIT_CARD',
    'DEBIT_CARD',
    'PAYPAL',
    'BANK_TRANSFER',
    'MOBILE_PAYMENT',
    'CRYPTO',
    'CASH'
);


ALTER TYPE public."PaymentMethodType" OWNER TO tamimahzami;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'REFUNDED',
    'PARTIALLY_REFUNDED',
    'DISPUTED',
    'AUTHORIZED'
);


ALTER TYPE public."PaymentStatus" OWNER TO tamimahzami;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'DISPATCHER',
    'FLEET_MANAGER',
    'DRIVER',
    'EMERGENCY_MANAGER',
    'ADMIN',
    'SUPER_ADMIN'
);


ALTER TYPE public."Role" OWNER TO tamimahzami;

--
-- Name: TransportType; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."TransportType" AS ENUM (
    'URBAN',
    'INTERCITY',
    'SCHOOL',
    'TOURISTIC',
    'DELIVERY',
    'SHUTTLE',
    'SPECIAL',
    'PUBLIC_TRANSIT'
);


ALTER TYPE public."TransportType" OWNER TO tamimahzami;

--
-- Name: TripStatus; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."TripStatus" AS ENUM (
    'PLANNED',
    'IN_PROGRESS',
    'COMPLETED',
    'DELAYED',
    'CANCELLED',
    'DIVERTED',
    'EMERGENCY',
    'ON_HOLD'
);


ALTER TYPE public."TripStatus" OWNER TO tamimahzami;

--
-- Name: VehicleStatus; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."VehicleStatus" AS ENUM (
    'AVAILABLE',
    'IN_USE',
    'MAINTENANCE',
    'OUT_OF_SERVICE',
    'DECOMMISSIONED',
    'CHARGING',
    'RESERVED',
    'NEEDS_INSPECTION'
);


ALTER TYPE public."VehicleStatus" OWNER TO tamimahzami;

--
-- Name: VehicleType; Type: TYPE; Schema: public; Owner: tamimahzami
--

CREATE TYPE public."VehicleType" AS ENUM (
    'BICYCLE',
    'E_SCOOTER',
    'MOTORBIKE',
    'CAR',
    'VAN',
    'TRUCK',
    'BUS',
    'TRAM',
    'TRAIN',
    'DELIVERY_TRUCK',
    'OTHER',
    'E_BIKE'
);


ALTER TYPE public."VehicleType" OWNER TO tamimahzami;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AuditLog; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."AuditLog" (
    id integer NOT NULL,
    action text NOT NULL,
    "entityType" text,
    "entityId" integer,
    "userId" integer,
    "ipAddress" text,
    "userAgent" text,
    "oldValue" jsonb,
    "newValue" jsonb,
    metadata jsonb,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."AuditLog" OWNER TO tamimahzami;

--
-- Name: AuditLog_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."AuditLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AuditLog_id_seq" OWNER TO tamimahzami;

--
-- Name: AuditLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."AuditLog_id_seq" OWNED BY public."AuditLog".id;


--
-- Name: Booking; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Booking" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "vehicleId" integer NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL,
    "actualStart" timestamp(3) without time zone,
    "actualEnd" timestamp(3) without time zone,
    status public."BookingStatus" DEFAULT 'UPCOMING'::public."BookingStatus" NOT NULL,
    purpose text,
    "estimatedCost" double precision,
    currency text DEFAULT 'EUR'::text,
    notes text,
    "tripId" integer,
    "invoiceId" integer,
    "approvedById" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Booking" OWNER TO tamimahzami;

--
-- Name: Booking_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Booking_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Booking_id_seq" OWNER TO tamimahzami;

--
-- Name: Booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Booking_id_seq" OWNED BY public."Booking".id;


--
-- Name: DamageReport; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."DamageReport" (
    id integer NOT NULL,
    "vehicleId" integer NOT NULL,
    "reportedById" integer NOT NULL,
    description text NOT NULL,
    photos text[],
    "isRepaired" boolean DEFAULT false NOT NULL,
    "repairedAt" timestamp(3) without time zone,
    "repairCost" double precision,
    "repairCurrency" text DEFAULT 'EUR'::text,
    "incidentDate" timestamp(3) without time zone NOT NULL,
    location jsonb,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DamageReport" OWNER TO tamimahzami;

--
-- Name: DamageReport_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."DamageReport_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DamageReport_id_seq" OWNER TO tamimahzami;

--
-- Name: DamageReport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."DamageReport_id_seq" OWNED BY public."DamageReport".id;


--
-- Name: DutyRoster; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."DutyRoster" (
    id integer NOT NULL,
    "driverId" integer NOT NULL,
    "vehicleId" integer NOT NULL,
    "lineId" integer,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL,
    breaks jsonb,
    status public."DutyStatus" DEFAULT 'ASSIGNED'::public."DutyStatus" NOT NULL,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DutyRoster" OWNER TO tamimahzami;

--
-- Name: DutyRoster_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."DutyRoster_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DutyRoster_id_seq" OWNER TO tamimahzami;

--
-- Name: DutyRoster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."DutyRoster_id_seq" OWNED BY public."DutyRoster".id;


--
-- Name: EmergencyEvent; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."EmergencyEvent" (
    id integer NOT NULL,
    type text NOT NULL,
    severity text DEFAULT 'MEDIUM'::text NOT NULL,
    description text,
    location jsonb,
    status text DEFAULT 'REPORTED'::text NOT NULL,
    "isResolved" boolean DEFAULT false NOT NULL,
    "resolvedAt" timestamp(3) without time zone,
    "actionsTaken" jsonb,
    notes text,
    "vehicleId" integer,
    "triggeredById" integer,
    "assignedToId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."EmergencyEvent" OWNER TO tamimahzami;

--
-- Name: EmergencyEvent_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."EmergencyEvent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."EmergencyEvent_id_seq" OWNER TO tamimahzami;

--
-- Name: EmergencyEvent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."EmergencyEvent_id_seq" OWNED BY public."EmergencyEvent".id;


--
-- Name: GeoFence; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."GeoFence" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "geoPolygon" jsonb NOT NULL,
    type text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    rules text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."GeoFence" OWNER TO tamimahzami;

--
-- Name: GeoFence_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."GeoFence_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."GeoFence_id_seq" OWNER TO tamimahzami;

--
-- Name: GeoFence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."GeoFence_id_seq" OWNED BY public."GeoFence".id;


--
-- Name: Invoice; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Invoice" (
    id integer NOT NULL,
    "bookingId" integer NOT NULL,
    amount double precision NOT NULL,
    currency text DEFAULT 'EUR'::text NOT NULL,
    "issueDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dueDate" timestamp(3) without time zone NOT NULL,
    "paymentStatus" public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "paymentMethodId" integer NOT NULL,
    "paidAt" timestamp(3) without time zone,
    notes text,
    "invoiceUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Invoice" OWNER TO tamimahzami;

--
-- Name: Invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Invoice_id_seq" OWNER TO tamimahzami;

--
-- Name: Invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Invoice_id_seq" OWNED BY public."Invoice".id;


--
-- Name: Line; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Line" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "transportType" public."TransportType" NOT NULL,
    "vehicleType" public."VehicleType",
    color text DEFAULT '#0066CC'::text NOT NULL,
    "operatingHours" jsonb,
    frequency integer,
    "isActive" boolean DEFAULT true NOT NULL,
    "routePolyline" text,
    "createdById" integer NOT NULL,
    "updatedById" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Line" OWNER TO tamimahzami;

--
-- Name: Line_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Line_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Line_id_seq" OWNER TO tamimahzami;

--
-- Name: Line_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Line_id_seq" OWNED BY public."Line".id;


--
-- Name: MaintenanceLog; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."MaintenanceLog" (
    id integer NOT NULL,
    "vehicleId" integer NOT NULL,
    type public."MaintenanceType" NOT NULL,
    description text NOT NULL,
    cost double precision,
    currency text DEFAULT 'EUR'::text,
    "invoiceUrl" text,
    "performedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "performedById" integer NOT NULL,
    "nextCheck" timestamp(3) without time zone,
    notes text,
    status text DEFAULT 'COMPLETED'::text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MaintenanceLog" OWNER TO tamimahzami;

--
-- Name: MaintenanceLog_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."MaintenanceLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MaintenanceLog_id_seq" OWNER TO tamimahzami;

--
-- Name: MaintenanceLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."MaintenanceLog_id_seq" OWNED BY public."MaintenanceLog".id;


--
-- Name: OBDSensorData; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."OBDSensorData" (
    id integer NOT NULL,
    "vehicleId" integer NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    rpm integer,
    speed integer,
    "fuelLevel" double precision,
    "engineLoad" double precision,
    "coolantTemp" integer,
    "errorCodes" text[],
    voltage double precision,
    "throttlePos" double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."OBDSensorData" OWNER TO tamimahzami;

--
-- Name: OBDSensorData_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."OBDSensorData_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."OBDSensorData_id_seq" OWNER TO tamimahzami;

--
-- Name: OBDSensorData_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."OBDSensorData_id_seq" OWNED BY public."OBDSensorData".id;


--
-- Name: ParkingZone; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."ParkingZone" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "geoPolygon" jsonb NOT NULL,
    "maxDuration" integer,
    "isActive" boolean DEFAULT true NOT NULL,
    rules text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ParkingZone" OWNER TO tamimahzami;

--
-- Name: ParkingZone_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."ParkingZone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."ParkingZone_id_seq" OWNER TO tamimahzami;

--
-- Name: ParkingZone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."ParkingZone_id_seq" OWNED BY public."ParkingZone".id;


--
-- Name: PaymentMethod; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."PaymentMethod" (
    id integer NOT NULL,
    type public."PaymentMethodType" NOT NULL,
    provider text,
    "lastFour" text,
    token text NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "expirationDate" timestamp(3) without time zone,
    "billingAddress" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."PaymentMethod" OWNER TO tamimahzami;

--
-- Name: PaymentMethod_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."PaymentMethod_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PaymentMethod_id_seq" OWNER TO tamimahzami;

--
-- Name: PaymentMethod_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."PaymentMethod_id_seq" OWNED BY public."PaymentMethod".id;


--
-- Name: PricingModel; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."PricingModel" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    rules jsonb NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "validFrom" timestamp(3) without time zone NOT NULL,
    "validUntil" timestamp(3) without time zone,
    "vehicleType" public."VehicleType",
    "transportType" public."TransportType",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PricingModel" OWNER TO tamimahzami;

--
-- Name: PricingModel_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."PricingModel_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PricingModel_id_seq" OWNER TO tamimahzami;

--
-- Name: PricingModel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."PricingModel_id_seq" OWNED BY public."PricingModel".id;


--
-- Name: Promotion; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Promotion" (
    id integer NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    description text,
    "discountType" text NOT NULL,
    "discountValue" double precision NOT NULL,
    "validFrom" timestamp(3) without time zone NOT NULL,
    "validUntil" timestamp(3) without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "minBookingAmount" double precision,
    "maxUsage" integer,
    "maxUsagePerUser" integer,
    "appliesToVehicleType" public."VehicleType",
    "appliesToUserRole" public."Role",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Promotion" OWNER TO tamimahzami;

--
-- Name: Promotion_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Promotion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Promotion_id_seq" OWNER TO tamimahzami;

--
-- Name: Promotion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Promotion_id_seq" OWNED BY public."Promotion".id;


--
-- Name: Route; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Route" (
    id integer NOT NULL,
    "lineId" integer NOT NULL,
    name text NOT NULL,
    sequence integer NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    "stopName" text,
    "estimatedTime" integer,
    distance integer,
    "isStop" boolean DEFAULT true NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "routePolylineSegment" text,
    "createdById" integer NOT NULL,
    "updatedById" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Route" OWNER TO tamimahzami;

--
-- Name: RouteConnection; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."RouteConnection" (
    id integer NOT NULL,
    "fromRouteId" integer NOT NULL,
    "toRouteId" integer NOT NULL,
    "walkTime" integer,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."RouteConnection" OWNER TO tamimahzami;

--
-- Name: RouteConnection_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."RouteConnection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RouteConnection_id_seq" OWNER TO tamimahzami;

--
-- Name: RouteConnection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."RouteConnection_id_seq" OWNED BY public."RouteConnection".id;


--
-- Name: Route_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Route_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Route_id_seq" OWNER TO tamimahzami;

--
-- Name: Route_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Route_id_seq" OWNED BY public."Route".id;


--
-- Name: Schedule; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Schedule" (
    id integer NOT NULL,
    "lineId" integer NOT NULL,
    name text,
    "validFrom" timestamp(3) without time zone NOT NULL,
    "validUntil" timestamp(3) without time zone,
    "isRecurring" boolean DEFAULT true NOT NULL,
    recurrence jsonb,
    exceptions jsonb,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Schedule" OWNER TO tamimahzami;

--
-- Name: Schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Schedule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Schedule_id_seq" OWNER TO tamimahzami;

--
-- Name: Schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Schedule_id_seq" OWNED BY public."Schedule".id;


--
-- Name: Station; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Station" (
    id integer NOT NULL,
    name text NOT NULL,
    address jsonb NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    capacity integer,
    facilities text[],
    "isOperational" boolean DEFAULT true NOT NULL,
    "contactInfo" jsonb,
    "operatingHours" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Station" OWNER TO tamimahzami;

--
-- Name: Station_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Station_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Station_id_seq" OWNER TO tamimahzami;

--
-- Name: Station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Station_id_seq" OWNED BY public."Station".id;


--
-- Name: Trip; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Trip" (
    id integer NOT NULL,
    "bookingId" integer NOT NULL,
    "scheduleId" integer,
    "driverId" integer,
    "vehicleId" integer NOT NULL,
    "actualStart" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "actualEnd" timestamp(3) without time zone,
    "startLocation" text,
    "endLocation" text,
    "routePolyline" text,
    "distanceKm" double precision,
    "durationMinutes" double precision,
    "totalCost" double precision,
    currency text DEFAULT 'EUR'::text,
    status public."TripStatus" DEFAULT 'PLANNED'::public."TripStatus" NOT NULL,
    "delayReason" text,
    user_rating integer,
    feedback text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Trip" OWNER TO tamimahzami;

--
-- Name: Trip_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Trip_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Trip_id_seq" OWNER TO tamimahzami;

--
-- Name: Trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Trip_id_seq" OWNED BY public."Trip".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    salt text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone character varying(30),
    "dateOfBirth" timestamp(3) without time zone,
    address jsonb,
    "isActive" boolean DEFAULT true NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "profilePicture" text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "driverLicense" text,
    qualifications text[],
    "lastLogin" timestamp(3) without time zone,
    "managerId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO tamimahzami;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO tamimahzami;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Vehicle; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."Vehicle" (
    id integer NOT NULL,
    "licensePlate" character varying(20) NOT NULL,
    vin character varying(17),
    make text NOT NULL,
    model text NOT NULL,
    year integer NOT NULL,
    color text NOT NULL,
    capacity integer DEFAULT 1 NOT NULL,
    "vehicleType" public."VehicleType" NOT NULL,
    status public."VehicleStatus" NOT NULL,
    "currentMileage" double precision NOT NULL,
    "lastMaintenance" timestamp(3) without time zone,
    "nextMaintenance" timestamp(3) without time zone,
    "fuelType" text,
    "fuelCapacity" double precision,
    "fuelLevel" double precision,
    "batteryCapacity" double precision,
    "batteryLevel" double precision,
    features jsonb,
    "insuranceNumber" text,
    "inspectionValidUntil" timestamp(3) without time zone,
    "lastLocationUpdate" timestamp(3) without time zone,
    latitude double precision,
    longitude double precision,
    "lastOBDUpdate" timestamp(3) without time zone,
    "currentRouteId" integer,
    "nextStopId" integer,
    "delayMinutes" integer DEFAULT 0,
    "isVerified" boolean DEFAULT false NOT NULL,
    "enteredById" integer,
    "qrCode" text,
    "vinScanned" text,
    "scanPhotos" text[],
    "obdDeviceId" text,
    "createdById" integer NOT NULL,
    "currentStationId" integer,
    "parkingZoneId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Vehicle" OWNER TO tamimahzami;

--
-- Name: Vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: tamimahzami
--

CREATE SEQUENCE public."Vehicle_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Vehicle_id_seq" OWNER TO tamimahzami;

--
-- Name: Vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tamimahzami
--

ALTER SEQUENCE public."Vehicle_id_seq" OWNED BY public."Vehicle".id;


--
-- Name: _DriverQualifications; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."_DriverQualifications" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_DriverQualifications" OWNER TO tamimahzami;

--
-- Name: _VehicleAssignments; Type: TABLE; Schema: public; Owner: tamimahzami
--

CREATE TABLE public."_VehicleAssignments" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_VehicleAssignments" OWNER TO tamimahzami;

--
-- Name: AuditLog id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."AuditLog" ALTER COLUMN id SET DEFAULT nextval('public."AuditLog_id_seq"'::regclass);


--
-- Name: Booking id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Booking" ALTER COLUMN id SET DEFAULT nextval('public."Booking_id_seq"'::regclass);


--
-- Name: DamageReport id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DamageReport" ALTER COLUMN id SET DEFAULT nextval('public."DamageReport_id_seq"'::regclass);


--
-- Name: DutyRoster id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DutyRoster" ALTER COLUMN id SET DEFAULT nextval('public."DutyRoster_id_seq"'::regclass);


--
-- Name: EmergencyEvent id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."EmergencyEvent" ALTER COLUMN id SET DEFAULT nextval('public."EmergencyEvent_id_seq"'::regclass);


--
-- Name: GeoFence id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."GeoFence" ALTER COLUMN id SET DEFAULT nextval('public."GeoFence_id_seq"'::regclass);


--
-- Name: Invoice id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Invoice" ALTER COLUMN id SET DEFAULT nextval('public."Invoice_id_seq"'::regclass);


--
-- Name: Line id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Line" ALTER COLUMN id SET DEFAULT nextval('public."Line_id_seq"'::regclass);


--
-- Name: MaintenanceLog id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."MaintenanceLog" ALTER COLUMN id SET DEFAULT nextval('public."MaintenanceLog_id_seq"'::regclass);


--
-- Name: OBDSensorData id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."OBDSensorData" ALTER COLUMN id SET DEFAULT nextval('public."OBDSensorData_id_seq"'::regclass);


--
-- Name: ParkingZone id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."ParkingZone" ALTER COLUMN id SET DEFAULT nextval('public."ParkingZone_id_seq"'::regclass);


--
-- Name: PaymentMethod id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."PaymentMethod" ALTER COLUMN id SET DEFAULT nextval('public."PaymentMethod_id_seq"'::regclass);


--
-- Name: PricingModel id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."PricingModel" ALTER COLUMN id SET DEFAULT nextval('public."PricingModel_id_seq"'::regclass);


--
-- Name: Promotion id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Promotion" ALTER COLUMN id SET DEFAULT nextval('public."Promotion_id_seq"'::regclass);


--
-- Name: Route id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Route" ALTER COLUMN id SET DEFAULT nextval('public."Route_id_seq"'::regclass);


--
-- Name: RouteConnection id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."RouteConnection" ALTER COLUMN id SET DEFAULT nextval('public."RouteConnection_id_seq"'::regclass);


--
-- Name: Schedule id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Schedule" ALTER COLUMN id SET DEFAULT nextval('public."Schedule_id_seq"'::regclass);


--
-- Name: Station id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Station" ALTER COLUMN id SET DEFAULT nextval('public."Station_id_seq"'::regclass);


--
-- Name: Trip id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Trip" ALTER COLUMN id SET DEFAULT nextval('public."Trip_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Vehicle id; Type: DEFAULT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Vehicle" ALTER COLUMN id SET DEFAULT nextval('public."Vehicle_id_seq"'::regclass);


--
-- Data for Name: AuditLog; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."AuditLog" (id, action, "entityType", "entityId", "userId", "ipAddress", "userAgent", "oldValue", "newValue", metadata, "timestamp") FROM stdin;
\.


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Booking" (id, "userId", "vehicleId", "startTime", "endTime", "actualStart", "actualEnd", status, purpose, "estimatedCost", currency, notes, "tripId", "invoiceId", "approvedById", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: DamageReport; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."DamageReport" (id, "vehicleId", "reportedById", description, photos, "isRepaired", "repairedAt", "repairCost", "repairCurrency", "incidentDate", location, notes, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: DutyRoster; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."DutyRoster" (id, "driverId", "vehicleId", "lineId", "startTime", "endTime", breaks, status, notes, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: EmergencyEvent; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."EmergencyEvent" (id, type, severity, description, location, status, "isResolved", "resolvedAt", "actionsTaken", notes, "vehicleId", "triggeredById", "assignedToId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: GeoFence; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."GeoFence" (id, name, description, "geoPolygon", type, "isActive", rules, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Invoice; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Invoice" (id, "bookingId", amount, currency, "issueDate", "dueDate", "paymentStatus", "paymentMethodId", "paidAt", notes, "invoiceUrl", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Line; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Line" (id, name, description, "transportType", "vehicleType", color, "operatingHours", frequency, "isActive", "routePolyline", "createdById", "updatedById", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: MaintenanceLog; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."MaintenanceLog" (id, "vehicleId", type, description, cost, currency, "invoiceUrl", "performedAt", "performedById", "nextCheck", notes, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: OBDSensorData; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."OBDSensorData" (id, "vehicleId", "timestamp", rpm, speed, "fuelLevel", "engineLoad", "coolantTemp", "errorCodes", voltage, "throttlePos", "createdAt") FROM stdin;
\.


--
-- Data for Name: ParkingZone; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."ParkingZone" (id, name, description, "geoPolygon", "maxDuration", "isActive", rules, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: PaymentMethod; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."PaymentMethod" (id, type, provider, "lastFour", token, "isDefault", "expirationDate", "billingAddress", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: PricingModel; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."PricingModel" (id, name, description, rules, "isActive", "validFrom", "validUntil", "vehicleType", "transportType", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Promotion; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Promotion" (id, code, name, description, "discountType", "discountValue", "validFrom", "validUntil", "isActive", "minBookingAmount", "maxUsage", "maxUsagePerUser", "appliesToVehicleType", "appliesToUserRole", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Route; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Route" (id, "lineId", name, sequence, latitude, longitude, "stopName", "estimatedTime", distance, "isStop", "isActive", "routePolylineSegment", "createdById", "updatedById", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: RouteConnection; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."RouteConnection" (id, "fromRouteId", "toRouteId", "walkTime", description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Schedule; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Schedule" (id, "lineId", name, "validFrom", "validUntil", "isRecurring", recurrence, exceptions, description, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Station; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Station" (id, name, address, latitude, longitude, capacity, facilities, "isOperational", "contactInfo", "operatingHours", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Trip; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Trip" (id, "bookingId", "scheduleId", "driverId", "vehicleId", "actualStart", "actualEnd", "startLocation", "endLocation", "routePolyline", "distanceKm", "durationMinutes", "totalCost", currency, status, "delayReason", user_rating, feedback, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."User" (id, email, "passwordHash", salt, "firstName", "lastName", phone, "dateOfBirth", address, "isActive", "isVerified", "profilePicture", role, "driverLicense", qualifications, "lastLogin", "managerId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Vehicle; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."Vehicle" (id, "licensePlate", vin, make, model, year, color, capacity, "vehicleType", status, "currentMileage", "lastMaintenance", "nextMaintenance", "fuelType", "fuelCapacity", "fuelLevel", "batteryCapacity", "batteryLevel", features, "insuranceNumber", "inspectionValidUntil", "lastLocationUpdate", latitude, longitude, "lastOBDUpdate", "currentRouteId", "nextStopId", "delayMinutes", "isVerified", "enteredById", "qrCode", "vinScanned", "scanPhotos", "obdDeviceId", "createdById", "currentStationId", "parkingZoneId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _DriverQualifications; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."_DriverQualifications" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _VehicleAssignments; Type: TABLE DATA; Schema: public; Owner: tamimahzami
--

COPY public."_VehicleAssignments" ("A", "B") FROM stdin;
\.


--
-- Name: AuditLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."AuditLog_id_seq"', 1, false);


--
-- Name: Booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Booking_id_seq"', 1, false);


--
-- Name: DamageReport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."DamageReport_id_seq"', 1, false);


--
-- Name: DutyRoster_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."DutyRoster_id_seq"', 1, false);


--
-- Name: EmergencyEvent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."EmergencyEvent_id_seq"', 1, false);


--
-- Name: GeoFence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."GeoFence_id_seq"', 1, false);


--
-- Name: Invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Invoice_id_seq"', 1, false);


--
-- Name: Line_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Line_id_seq"', 1, false);


--
-- Name: MaintenanceLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."MaintenanceLog_id_seq"', 1, false);


--
-- Name: OBDSensorData_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."OBDSensorData_id_seq"', 1, false);


--
-- Name: ParkingZone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."ParkingZone_id_seq"', 1, false);


--
-- Name: PaymentMethod_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."PaymentMethod_id_seq"', 1, false);


--
-- Name: PricingModel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."PricingModel_id_seq"', 1, false);


--
-- Name: Promotion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Promotion_id_seq"', 1, false);


--
-- Name: RouteConnection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."RouteConnection_id_seq"', 1, false);


--
-- Name: Route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Route_id_seq"', 1, false);


--
-- Name: Schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Schedule_id_seq"', 1, false);


--
-- Name: Station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Station_id_seq"', 1, false);


--
-- Name: Trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Trip_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, false);


--
-- Name: Vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tamimahzami
--

SELECT pg_catalog.setval('public."Vehicle_id_seq"', 1, false);


--
-- Name: AuditLog AuditLog_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."AuditLog"
    ADD CONSTRAINT "AuditLog_pkey" PRIMARY KEY (id);


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: DamageReport DamageReport_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DamageReport"
    ADD CONSTRAINT "DamageReport_pkey" PRIMARY KEY (id);


--
-- Name: DutyRoster DutyRoster_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DutyRoster"
    ADD CONSTRAINT "DutyRoster_pkey" PRIMARY KEY (id);


--
-- Name: EmergencyEvent EmergencyEvent_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."EmergencyEvent"
    ADD CONSTRAINT "EmergencyEvent_pkey" PRIMARY KEY (id);


--
-- Name: GeoFence GeoFence_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."GeoFence"
    ADD CONSTRAINT "GeoFence_pkey" PRIMARY KEY (id);


--
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- Name: Line Line_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Line"
    ADD CONSTRAINT "Line_pkey" PRIMARY KEY (id);


--
-- Name: MaintenanceLog MaintenanceLog_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."MaintenanceLog"
    ADD CONSTRAINT "MaintenanceLog_pkey" PRIMARY KEY (id);


--
-- Name: OBDSensorData OBDSensorData_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."OBDSensorData"
    ADD CONSTRAINT "OBDSensorData_pkey" PRIMARY KEY (id);


--
-- Name: ParkingZone ParkingZone_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."ParkingZone"
    ADD CONSTRAINT "ParkingZone_pkey" PRIMARY KEY (id);


--
-- Name: PaymentMethod PaymentMethod_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."PaymentMethod"
    ADD CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY (id);


--
-- Name: PricingModel PricingModel_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."PricingModel"
    ADD CONSTRAINT "PricingModel_pkey" PRIMARY KEY (id);


--
-- Name: Promotion Promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Promotion"
    ADD CONSTRAINT "Promotion_pkey" PRIMARY KEY (id);


--
-- Name: RouteConnection RouteConnection_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."RouteConnection"
    ADD CONSTRAINT "RouteConnection_pkey" PRIMARY KEY (id);


--
-- Name: Route Route_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Route"
    ADD CONSTRAINT "Route_pkey" PRIMARY KEY (id);


--
-- Name: Schedule Schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY (id);


--
-- Name: Station Station_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Station"
    ADD CONSTRAINT "Station_pkey" PRIMARY KEY (id);


--
-- Name: Trip Trip_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Vehicle Vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_pkey" PRIMARY KEY (id);


--
-- Name: _DriverQualifications _DriverQualifications_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."_DriverQualifications"
    ADD CONSTRAINT "_DriverQualifications_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _VehicleAssignments _VehicleAssignments_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."_VehicleAssignments"
    ADD CONSTRAINT "_VehicleAssignments_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: AuditLog_action_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "AuditLog_action_idx" ON public."AuditLog" USING btree (action);


--
-- Name: AuditLog_entityType_entityId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "AuditLog_entityType_entityId_idx" ON public."AuditLog" USING btree ("entityType", "entityId");


--
-- Name: AuditLog_timestamp_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "AuditLog_timestamp_idx" ON public."AuditLog" USING btree ("timestamp");


--
-- Name: AuditLog_userId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "AuditLog_userId_idx" ON public."AuditLog" USING btree ("userId");


--
-- Name: Booking_invoiceId_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Booking_invoiceId_key" ON public."Booking" USING btree ("invoiceId");


--
-- Name: Booking_startTime_endTime_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Booking_startTime_endTime_idx" ON public."Booking" USING btree ("startTime", "endTime");


--
-- Name: Booking_status_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Booking_status_idx" ON public."Booking" USING btree (status);


--
-- Name: Booking_tripId_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Booking_tripId_key" ON public."Booking" USING btree ("tripId");


--
-- Name: Booking_userId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Booking_userId_idx" ON public."Booking" USING btree ("userId");


--
-- Name: Booking_vehicleId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Booking_vehicleId_idx" ON public."Booking" USING btree ("vehicleId");


--
-- Name: DamageReport_incidentDate_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "DamageReport_incidentDate_idx" ON public."DamageReport" USING btree ("incidentDate");


--
-- Name: DamageReport_isRepaired_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "DamageReport_isRepaired_idx" ON public."DamageReport" USING btree ("isRepaired");


--
-- Name: DamageReport_vehicleId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "DamageReport_vehicleId_idx" ON public."DamageReport" USING btree ("vehicleId");


--
-- Name: DutyRoster_driverId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "DutyRoster_driverId_idx" ON public."DutyRoster" USING btree ("driverId");


--
-- Name: DutyRoster_lineId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "DutyRoster_lineId_idx" ON public."DutyRoster" USING btree ("lineId");


--
-- Name: DutyRoster_startTime_endTime_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "DutyRoster_startTime_endTime_idx" ON public."DutyRoster" USING btree ("startTime", "endTime");


--
-- Name: DutyRoster_vehicleId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "DutyRoster_vehicleId_idx" ON public."DutyRoster" USING btree ("vehicleId");


--
-- Name: EmergencyEvent_isResolved_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "EmergencyEvent_isResolved_idx" ON public."EmergencyEvent" USING btree ("isResolved");


--
-- Name: EmergencyEvent_severity_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "EmergencyEvent_severity_idx" ON public."EmergencyEvent" USING btree (severity);


--
-- Name: EmergencyEvent_status_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "EmergencyEvent_status_idx" ON public."EmergencyEvent" USING btree (status);


--
-- Name: EmergencyEvent_type_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "EmergencyEvent_type_idx" ON public."EmergencyEvent" USING btree (type);


--
-- Name: GeoFence_isActive_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "GeoFence_isActive_idx" ON public."GeoFence" USING btree ("isActive");


--
-- Name: GeoFence_name_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "GeoFence_name_key" ON public."GeoFence" USING btree (name);


--
-- Name: GeoFence_type_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "GeoFence_type_idx" ON public."GeoFence" USING btree (type);


--
-- Name: Invoice_bookingId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Invoice_bookingId_idx" ON public."Invoice" USING btree ("bookingId");


--
-- Name: Invoice_bookingId_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Invoice_bookingId_key" ON public."Invoice" USING btree ("bookingId");


--
-- Name: Invoice_issueDate_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Invoice_issueDate_idx" ON public."Invoice" USING btree ("issueDate");


--
-- Name: Invoice_paymentStatus_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Invoice_paymentStatus_idx" ON public."Invoice" USING btree ("paymentStatus");


--
-- Name: Line_isActive_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Line_isActive_idx" ON public."Line" USING btree ("isActive");


--
-- Name: Line_name_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Line_name_key" ON public."Line" USING btree (name);


--
-- Name: Line_transportType_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Line_transportType_idx" ON public."Line" USING btree ("transportType");


--
-- Name: MaintenanceLog_performedAt_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "MaintenanceLog_performedAt_idx" ON public."MaintenanceLog" USING btree ("performedAt");


--
-- Name: MaintenanceLog_type_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "MaintenanceLog_type_idx" ON public."MaintenanceLog" USING btree (type);


--
-- Name: MaintenanceLog_vehicleId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "MaintenanceLog_vehicleId_idx" ON public."MaintenanceLog" USING btree ("vehicleId");


--
-- Name: OBDSensorData_timestamp_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "OBDSensorData_timestamp_idx" ON public."OBDSensorData" USING btree ("timestamp");


--
-- Name: OBDSensorData_vehicleId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "OBDSensorData_vehicleId_idx" ON public."OBDSensorData" USING btree ("vehicleId");


--
-- Name: ParkingZone_isActive_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "ParkingZone_isActive_idx" ON public."ParkingZone" USING btree ("isActive");


--
-- Name: ParkingZone_name_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "ParkingZone_name_idx" ON public."ParkingZone" USING btree (name);


--
-- Name: ParkingZone_name_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "ParkingZone_name_key" ON public."ParkingZone" USING btree (name);


--
-- Name: PaymentMethod_token_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "PaymentMethod_token_key" ON public."PaymentMethod" USING btree (token);


--
-- Name: PaymentMethod_type_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "PaymentMethod_type_idx" ON public."PaymentMethod" USING btree (type);


--
-- Name: PaymentMethod_userId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "PaymentMethod_userId_idx" ON public."PaymentMethod" USING btree ("userId");


--
-- Name: PricingModel_isActive_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "PricingModel_isActive_idx" ON public."PricingModel" USING btree ("isActive");


--
-- Name: PricingModel_name_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "PricingModel_name_key" ON public."PricingModel" USING btree (name);


--
-- Name: PricingModel_validFrom_validUntil_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "PricingModel_validFrom_validUntil_idx" ON public."PricingModel" USING btree ("validFrom", "validUntil");


--
-- Name: Promotion_code_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Promotion_code_idx" ON public."Promotion" USING btree (code);


--
-- Name: Promotion_code_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Promotion_code_key" ON public."Promotion" USING btree (code);


--
-- Name: Promotion_isActive_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Promotion_isActive_idx" ON public."Promotion" USING btree ("isActive");


--
-- Name: Promotion_validFrom_validUntil_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Promotion_validFrom_validUntil_idx" ON public."Promotion" USING btree ("validFrom", "validUntil");


--
-- Name: RouteConnection_fromRouteId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "RouteConnection_fromRouteId_idx" ON public."RouteConnection" USING btree ("fromRouteId");


--
-- Name: RouteConnection_fromRouteId_toRouteId_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "RouteConnection_fromRouteId_toRouteId_key" ON public."RouteConnection" USING btree ("fromRouteId", "toRouteId");


--
-- Name: RouteConnection_toRouteId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "RouteConnection_toRouteId_idx" ON public."RouteConnection" USING btree ("toRouteId");


--
-- Name: Route_latitude_longitude_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Route_latitude_longitude_idx" ON public."Route" USING btree (latitude, longitude);


--
-- Name: Route_lineId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Route_lineId_idx" ON public."Route" USING btree ("lineId");


--
-- Name: Route_lineId_sequence_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Route_lineId_sequence_key" ON public."Route" USING btree ("lineId", sequence);


--
-- Name: Schedule_lineId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Schedule_lineId_idx" ON public."Schedule" USING btree ("lineId");


--
-- Name: Schedule_validFrom_validUntil_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Schedule_validFrom_validUntil_idx" ON public."Schedule" USING btree ("validFrom", "validUntil");


--
-- Name: Station_isOperational_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Station_isOperational_idx" ON public."Station" USING btree ("isOperational");


--
-- Name: Station_latitude_longitude_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Station_latitude_longitude_idx" ON public."Station" USING btree (latitude, longitude);


--
-- Name: Station_name_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Station_name_key" ON public."Station" USING btree (name);


--
-- Name: Trip_bookingId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Trip_bookingId_idx" ON public."Trip" USING btree ("bookingId");


--
-- Name: Trip_bookingId_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Trip_bookingId_key" ON public."Trip" USING btree ("bookingId");


--
-- Name: Trip_driverId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Trip_driverId_idx" ON public."Trip" USING btree ("driverId");


--
-- Name: Trip_scheduleId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Trip_scheduleId_idx" ON public."Trip" USING btree ("scheduleId");


--
-- Name: Trip_status_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Trip_status_idx" ON public."Trip" USING btree (status);


--
-- Name: Trip_vehicleId_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Trip_vehicleId_idx" ON public."Trip" USING btree ("vehicleId");


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_lastName_firstName_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "User_lastName_firstName_idx" ON public."User" USING btree ("lastName", "firstName");


--
-- Name: User_role_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "User_role_idx" ON public."User" USING btree (role);


--
-- Name: Vehicle_licensePlate_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Vehicle_licensePlate_idx" ON public."Vehicle" USING btree ("licensePlate");


--
-- Name: Vehicle_licensePlate_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON public."Vehicle" USING btree ("licensePlate");


--
-- Name: Vehicle_make_model_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Vehicle_make_model_idx" ON public."Vehicle" USING btree (make, model);


--
-- Name: Vehicle_obdDeviceId_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Vehicle_obdDeviceId_key" ON public."Vehicle" USING btree ("obdDeviceId");


--
-- Name: Vehicle_qrCode_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Vehicle_qrCode_key" ON public."Vehicle" USING btree ("qrCode");


--
-- Name: Vehicle_status_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Vehicle_status_idx" ON public."Vehicle" USING btree (status);


--
-- Name: Vehicle_vehicleType_idx; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "Vehicle_vehicleType_idx" ON public."Vehicle" USING btree ("vehicleType");


--
-- Name: Vehicle_vin_key; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE UNIQUE INDEX "Vehicle_vin_key" ON public."Vehicle" USING btree (vin);


--
-- Name: _DriverQualifications_B_index; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "_DriverQualifications_B_index" ON public."_DriverQualifications" USING btree ("B");


--
-- Name: _VehicleAssignments_B_index; Type: INDEX; Schema: public; Owner: tamimahzami
--

CREATE INDEX "_VehicleAssignments_B_index" ON public."_VehicleAssignments" USING btree ("B");


--
-- Name: Booking Booking_approvedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DamageReport DamageReport_reportedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DamageReport"
    ADD CONSTRAINT "DamageReport_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DamageReport DamageReport_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DamageReport"
    ADD CONSTRAINT "DamageReport_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DutyRoster DutyRoster_driverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DutyRoster"
    ADD CONSTRAINT "DutyRoster_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DutyRoster DutyRoster_lineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DutyRoster"
    ADD CONSTRAINT "DutyRoster_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES public."Line"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DutyRoster DutyRoster_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."DutyRoster"
    ADD CONSTRAINT "DutyRoster_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EmergencyEvent EmergencyEvent_assignedToId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."EmergencyEvent"
    ADD CONSTRAINT "EmergencyEvent_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EmergencyEvent EmergencyEvent_triggeredById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."EmergencyEvent"
    ADD CONSTRAINT "EmergencyEvent_triggeredById_fkey" FOREIGN KEY ("triggeredById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EmergencyEvent EmergencyEvent_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."EmergencyEvent"
    ADD CONSTRAINT "EmergencyEvent_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Invoice Invoice_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invoice Invoice_paymentMethodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES public."PaymentMethod"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Line Line_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Line"
    ADD CONSTRAINT "Line_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Line Line_updatedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Line"
    ADD CONSTRAINT "Line_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: MaintenanceLog MaintenanceLog_performedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."MaintenanceLog"
    ADD CONSTRAINT "MaintenanceLog_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MaintenanceLog MaintenanceLog_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."MaintenanceLog"
    ADD CONSTRAINT "MaintenanceLog_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OBDSensorData OBDSensorData_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."OBDSensorData"
    ADD CONSTRAINT "OBDSensorData_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PaymentMethod PaymentMethod_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."PaymentMethod"
    ADD CONSTRAINT "PaymentMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RouteConnection RouteConnection_fromRouteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."RouteConnection"
    ADD CONSTRAINT "RouteConnection_fromRouteId_fkey" FOREIGN KEY ("fromRouteId") REFERENCES public."Route"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RouteConnection RouteConnection_toRouteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."RouteConnection"
    ADD CONSTRAINT "RouteConnection_toRouteId_fkey" FOREIGN KEY ("toRouteId") REFERENCES public."Route"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Route Route_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Route"
    ADD CONSTRAINT "Route_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Route Route_lineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Route"
    ADD CONSTRAINT "Route_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES public."Line"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Route Route_updatedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Route"
    ADD CONSTRAINT "Route_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Schedule Schedule_lineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Schedule"
    ADD CONSTRAINT "Schedule_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES public."Line"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Trip Trip_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Trip Trip_driverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Trip Trip_scheduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES public."Schedule"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Trip Trip_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_managerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Vehicle Vehicle_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Vehicle Vehicle_currentRouteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_currentRouteId_fkey" FOREIGN KEY ("currentRouteId") REFERENCES public."Route"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Vehicle Vehicle_currentStationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_currentStationId_fkey" FOREIGN KEY ("currentStationId") REFERENCES public."Station"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Vehicle Vehicle_enteredById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_enteredById_fkey" FOREIGN KEY ("enteredById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Vehicle Vehicle_nextStopId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_nextStopId_fkey" FOREIGN KEY ("nextStopId") REFERENCES public."Route"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Vehicle Vehicle_parkingZoneId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."Vehicle"
    ADD CONSTRAINT "Vehicle_parkingZoneId_fkey" FOREIGN KEY ("parkingZoneId") REFERENCES public."ParkingZone"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _DriverQualifications _DriverQualifications_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."_DriverQualifications"
    ADD CONSTRAINT "_DriverQualifications_A_fkey" FOREIGN KEY ("A") REFERENCES public."Line"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _DriverQualifications _DriverQualifications_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."_DriverQualifications"
    ADD CONSTRAINT "_DriverQualifications_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _VehicleAssignments _VehicleAssignments_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."_VehicleAssignments"
    ADD CONSTRAINT "_VehicleAssignments_A_fkey" FOREIGN KEY ("A") REFERENCES public."Line"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _VehicleAssignments _VehicleAssignments_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tamimahzami
--

ALTER TABLE ONLY public."_VehicleAssignments"
    ADD CONSTRAINT "_VehicleAssignments_B_fkey" FOREIGN KEY ("B") REFERENCES public."Vehicle"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

