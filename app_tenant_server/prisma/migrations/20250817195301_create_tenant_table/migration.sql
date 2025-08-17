-- CreateTable
CREATE TABLE "public"."tenant" (
    "id" SERIAL NOT NULL,
    "subdomain" TEXT NOT NULL,
    "api" TEXT NOT NULL,
    "nome_loja" TEXT NOT NULL,
    "descricao_loja" TEXT,
    "url_logo_loja" TEXT,
    "whatsapp_pedidos" TEXT,

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenant_subdomain_key" ON "public"."tenant"("subdomain");
