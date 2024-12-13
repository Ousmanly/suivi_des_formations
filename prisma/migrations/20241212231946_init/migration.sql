-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "password" TEXT NOT NULL,
    "role" VARCHAR(30) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(50) NOT NULL,
    "phoneNumber" VARCHAR(15) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "tutor" VARCHAR(50),
    "status" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "dateRegister" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "mount" DECIMAL(10,2) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "registrationId" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "payer" VARCHAR(50) NOT NULL,
    "payerNumber" VARCHAR(15) NOT NULL,
    "paymentMode" VARCHAR(50) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PaymentToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PaymentToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PaymentToStudent_B_index" ON "_PaymentToStudent"("B");

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToStudent" ADD CONSTRAINT "_PaymentToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToStudent" ADD CONSTRAINT "_PaymentToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
