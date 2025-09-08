<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'

import ProductCard from './ProductCard.vue'

const $q = useQuasar()

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const products = computed(() => {
  let size
  if ($q.screen.lt.sm) {
    size = 4
  } else if ($q.screen.lt.md) {
    size = 3
  } else if ($q.screen.lt.lg) {
    size = 4
  } else {
    size = 6
  }
  return props.section.produtos.slice(0, size)
})
</script>

<template>
  <article>
    <h3 class="text-h5">{{ section.nome }}</h3>
    <section class="row items-stretch q-col-gutter-md">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
      >
        <ProductCard
          :product="product"
          class="product-card fit"
          @click:card="$emit('goToProductDetails', product.slug)"
        >
          <template #actions>
            <q-btn
              color="primary"
              label="Ver detalhes"
              unelevated
              :to="{ name: 'produto-detalhes', params: { productSlug: product.slug } }"
            />
          </template>
        </ProductCard>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.product-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>
