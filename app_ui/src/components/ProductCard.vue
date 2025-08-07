<template>
  <div>
    <q-card>
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
