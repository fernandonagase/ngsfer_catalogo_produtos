<template>
  <div>
    <q-card class="cursor-pointer" @click="$emit('click:card', product.slug)">
      <q-img
        src="https://placedog.net/1024/768"
        :ratio="16 / 9"
        spinner-color="primary"
        spinner-size="82px"
        loading-show-delay="800"
        no-spinner
      />
      <q-card-section>
        <p class="text-body2 text-uppercase text-weight-medium q-mb-none">
          {{ product.marca.nome }}
        </p>
        <div class="text-caption ellipsis-2-lines">{{ product.nome }}</div>
        <div class="text-body1">{{ formatCurrencyFromCents(product.preco) }}</div>
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
