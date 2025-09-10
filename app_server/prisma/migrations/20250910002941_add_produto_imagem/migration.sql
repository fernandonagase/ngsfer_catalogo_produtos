-- CreateTable
CREATE TABLE "public"."produto_imagem" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "alt_text" VARCHAR(200),
    "position" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,

    CONSTRAINT "produto_imagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."produto_imagem" ADD CONSTRAINT "produto_imagem_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "public"."produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
