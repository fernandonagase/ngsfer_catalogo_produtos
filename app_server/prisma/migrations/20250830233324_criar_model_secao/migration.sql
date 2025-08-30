-- CreateEnum
CREATE TYPE "public"."secao_tipo" AS ENUM ('personalizado', 'novidade', 'mais_vendidos');

-- CreateTable
CREATE TABLE "public"."secao" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "tipo" "public"."secao_tipo" NOT NULL DEFAULT 'personalizado',

    CONSTRAINT "secao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ProdutoToSecao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProdutoToSecao_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProdutoToSecao_B_index" ON "public"."_ProdutoToSecao"("B");

-- AddForeignKey
ALTER TABLE "public"."_ProdutoToSecao" ADD CONSTRAINT "_ProdutoToSecao_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProdutoToSecao" ADD CONSTRAINT "_ProdutoToSecao_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."secao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
