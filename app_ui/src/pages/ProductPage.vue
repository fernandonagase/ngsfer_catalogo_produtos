<template>
  <q-page padding>
      <div class="layout-container q-mx-auto">
        <h1 class="text-h4 q-mb-sm">{{ produto.nome }}</h1>
        <p v-if="produto.marca">Marca: {{ produto.marca.nome }}</p>
        <p class="text-subtitle1 text-weight-bold">{{ formatCurrencyFromCents(produto.preco) }}</p>
        <h2 class="text-h5 q-mb-xs">Sobre o produto</h2>
        <p class="text-body1">{{ produto.descricao }}</p>
        <h3 class="text-h6 q-mb-sm">Categorias</h3>
        <div class="q-gutter-sm">
          <span v-for="categoria in produto.categorias" :key="categoria.id">{{ categoria.nome }}</span>
        </div>
      </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

import { useProductStore } from 'src/stores/product-store';
import { formatCurrencyFromCents } from 'src/helpers/currency.js';

export default defineComponent({
    name: 'ProductPage',
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
    preFetch({currentRoute}) {
        const productStore = useProductStore();
        return productStore.fetchById(currentRoute.params.productId);
    },
    setup() {
        const productStore = useProductStore();

        return {
            produto: productStore.product,
            formatCurrencyFromCents,
        };
    }
})
</script>