<template>
  <div>
    <q-card class="cursor-pointer" @click="$emit('click:card', product.id)">
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
        <slot name="actions"></slot>
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

defineEmits(['click:card'])
</script>
