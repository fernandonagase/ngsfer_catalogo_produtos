-- AlterTable
ALTER TABLE "public"."secao" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ordem" INTEGER;
