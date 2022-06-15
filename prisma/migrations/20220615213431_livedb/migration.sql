-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE', 'PAYPAL', 'TWITCH');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SUCCESS', 'FAILURE');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('ONETIME', 'MONTHLY');

-- CreateEnum
CREATE TYPE "VolunteerPosition" AS ENUM ('CODING', 'CLINICAL', 'COMMUNITY', 'EVENT');

-- CreateTable
CREATE TABLE "Donation" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL,
    "user" VARCHAR,
    "payment_type" "PaymentType",
    "payment_method" "PaymentMethod",
    "payment_status" "PaymentStatus",
    "customer_id" VARCHAR NOT NULL,
    "email" VARCHAR,
    "name" VARCHAR,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "position" VARCHAR,
    "experience" TEXT,
    "message" TEXT,
    "user" UUID,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "company" TEXT,
    "type" VARCHAR,
    "message" TEXT,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,
    "department" VARCHAR,
    "message" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "email" VARCHAR,
    "is_monthly" BOOLEAN DEFAULT false,
    "newsletter" BOOLEAN NOT NULL DEFAULT false,
    "volunteer" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_customer_id_key" ON "Donation"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_user_key" ON "Volunteer"("user");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
