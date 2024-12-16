/*
  Warnings:

  - You are about to drop the column `employees` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "employees",
ADD COLUMN     "employeesCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "categoryId" SET DEFAULT '-';
