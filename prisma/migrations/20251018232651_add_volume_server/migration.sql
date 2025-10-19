/*
  Warnings:

  - A unique constraint covering the columns `[volumeName]` on the table `servers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `volumeName` to the `servers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servers" ADD COLUMN     "volumeName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "servers_volumeName_key" ON "servers"("volumeName");
