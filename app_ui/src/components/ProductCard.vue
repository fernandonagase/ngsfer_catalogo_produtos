<template>
  <div>
    <q-card flat bordered class="fit cursor-pointer" @click="$emit('click:card', product.slug)">
      <q-img
        :src="mainImage.url"
        :alt="mainImage.altText"
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
import { computed } from 'vue'

import { formatCurrencyFromCents } from 'src/helpers/currency.js'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

defineEmits(['click:card'])

const mainImage = computed(
  () =>
    props.product.imagens?.find((image) => image.position === 1) ?? {
      url: 'https://placedog.net/1024/768',
      altText: '',
    },
)
</script>
