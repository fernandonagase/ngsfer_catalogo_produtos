<template>
  <q-page padding>
    <div class="layout-container q-mx-auto">
      <div class="q-mb-md">
        <RouterLink :to="{ name: 'produto-lista' }"> Voltar para a lista </RouterLink>
      </div>
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-xs-12 col-sm-6">
          <q-img
            src="https://placedog.net/1024/768"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
        <div class="col-xs-12 col-sm-6">
          <h1 class="text-h4 q-mb-sm">{{ produto.nome }}</h1>
          <p v-if="produto.marca">Marca: {{ produto.marca.nome }}</p>
          <p class="text-h5 text-weight-bold">
            {{ formatCurrencyFromCents(produto.preco) }}
          </p>
          <q-btn
            color="green"
            icon="fa-brands fa-whatsapp"
            size="lg"
            label="Pedir pelo WhatsApp"
            @click="adicionarAoCarrinho(produto.id)"
          />
        </div>
      </div>
      <h2 class="text-h5 q-mb-xs">Sobre o produto</h2>
      <p class="text-body1">{{ produto.descricao }}</p>
      <h3 class="text-h6 q-mb-sm">Categorias</h3>
      <div class="q-gutter-sm">
        <span v-for="categoria in produto.categorias" :key="categoria.id">{{
          categoria.nome
        }}</span>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import { useProductStore } from 'src/stores/product-store'
import { formatCurrencyFromCents } from 'src/helpers/currency.js'

export default defineComponent({
  name: 'ProductPage',
  props: {
    productId: {
      type: String,
      required: true,
    },
    productSlug: {
      type: String,
      required: true,
    },
  },
  preFetch({ currentRoute }) {
    const productStore = useProductStore()
    return productStore.fetchBySlug(currentRoute.params.productSlug)
  },
  setup() {
    const productStore = useProductStore()

    return {
      produto: productStore.product,
      formatCurrencyFromCents,
    }
  },
})
</script>
