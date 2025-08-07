<template>
  <div>
    <q-card>
      <q-img
        src="https://placedog.net/1024/768"
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
      />
      <q-card-section>
        <div class="text-h6">{{ product.nome }}</div>
        <div class="text-subtitle2">{{ formatCurrencyFromCents(product.preco) }}</div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          label="Ver detalhes"
          unelevated
          :to="{ name: 'produto-detalhes', params: { productId: product.id } }"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { formatCurrencyFromCents } from 'src/helpers/currency.js'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
