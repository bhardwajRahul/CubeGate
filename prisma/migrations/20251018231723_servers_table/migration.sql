-- CreateEnum
CREATE TYPE "ServerType" AS ENUM ('VANILLA', 'PAPER', 'SPIGOT', 'FABRIC', 'FORGE');

-- CreateEnum
CREATE TYPE "ServerStatus" AS ENUM ('CREATING', 'RUNNING', 'STOPPED', 'ERROR');

-- CreateTable
CREATE TABLE "servers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eula" BOOLEAN NOT NULL DEFAULT true,
    "version" TEXT NOT NULL,
    "minMemoryMB" TEXT NOT NULL DEFAULT '2G',
    "maxMemoryMB" TEXT NOT NULL DEFAULT '4G',
    "serverType" "ServerType" NOT NULL,
    "status" "ServerStatus" NOT NULL DEFAULT 'CREATING',
    "ipAddress" INET NOT NULL,
    "port" INTEGER NOT NULL,
    "containerName" TEXT NOT NULL,
    "containerId" TEXT,
    "dockerImage" TEXT NOT NULL DEFAULT 'itzg/minecraft-server:latest',
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "servers_containerName_key" ON "servers"("containerName");

-- CreateIndex
CREATE UNIQUE INDEX "servers_containerId_key" ON "servers"("containerId");

-- CreateIndex
CREATE INDEX "servers_ownerId_status_idx" ON "servers"("ownerId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "servers_ipAddress_port_key" ON "servers"("ipAddress", "port");

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
