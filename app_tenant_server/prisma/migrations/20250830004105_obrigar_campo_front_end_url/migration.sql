/*
  Warnings:

  - Made the column `front_end_url` on table `tenant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."tenant" ALTER COLUMN "front_end_url" SET NOT NULL;
