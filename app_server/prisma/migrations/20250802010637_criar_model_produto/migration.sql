-- CreateTable
CREATE TABLE "public"."produto" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" INTEGER NOT NULL,
    "descricao" TEXT,
    "marcaId" INTEGER,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CategoriaToProduto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoriaToProduto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "produto_slug_key" ON "public"."produto"("slug");

-- CreateIndex
CREATE INDEX "_CategoriaToProduto_B_index" ON "public"."_CategoriaToProduto"("B");

-- AddForeignKey
ALTER TABLE "public"."produto" ADD CONSTRAINT "produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "public"."marca"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoriaToProduto" ADD CONSTRAINT "_CategoriaToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoriaToProduto" ADD CONSTRAINT "_CategoriaToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
