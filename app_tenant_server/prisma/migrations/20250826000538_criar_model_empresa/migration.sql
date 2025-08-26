/*
  Warnings:

  - A unique constraint covering the columns `[empresa_id]` on the table `tenant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."tenant" ADD COLUMN     "empresa_id" TEXT;

-- CreateTable
CREATE TABLE "public"."empresa" (
    "id" TEXT NOT NULL,
    "documento" VARCHAR(14) NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "nome_fantasia" VARCHAR(200),
    "endereco" VARCHAR(300) NOT NULL,
    "whatsapp_contato" VARCHAR(13),
    "telefone_contato" VARCHAR(13),
    "email_contato" VARCHAR(320),

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_empresa_id_key" ON "public"."tenant"("empresa_id");

-- AddForeignKey
ALTER TABLE "public"."tenant" ADD CONSTRAINT "tenant_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "public"."empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
