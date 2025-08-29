<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  products: {
    type: Array,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
})
const sort = defineModel('sort')
const page = defineModel('page')
defineEmits(['goToProductDetails'])

const sortOptions = [
  { value: null, label: 'Em alta' },
  { value: 'preco-asc', label: 'Preço: menor para maior' },
  { value: 'preco-desc', label: 'Preço: maior para menor' },
  { value: 'nome-asc', label: 'Nome: A-Z' },
  { value: 'nome-desc', label: 'Nome: Z-A' },
]
</script>

<template>
  <div>
    <template v-if="products.length > 0">
      <div class="q-mb-md flex sort-by-select">
        <q-select
          v-model="sort"
          :options="sortOptions"
          label="Classificar por"
          filled
          class="full-width"
          emit-value
          map-options
        />
      </div>
      <div class="row q-col-gutter-md">
        <div v-for="product in products" :key="product.id" class="col-xs-6 col-sm-4 col-md-3">
          <ProductCard
            :product="product"
            class="product-card"
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
      </div>
      <div v-if="pageCount > 1" class="flex justify-center">
        <q-pagination
          v-model="page"
          :max="pageCount"
          direction-links
          boundary-links
          class="q-mt-lg"
        />
      </div>
    </template>
    <div v-else class="text-center q-mt-lg">
      <p class="text-h6">Nenhum produto encontrado.</p>
    </div>
  </div>
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

.sort-by-select {
  width: min(100%, 400px);
}
</style>
