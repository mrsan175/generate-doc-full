-- CreateTable
CREATE TABLE "otp" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_phoneNumber_key" ON "otp"("phoneNumber");
