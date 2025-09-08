<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  section: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article>
    <h3 class="text-h5">{{ section.nome }}</h3>
    <section class="row items-stretch q-col-gutter-md">
      <div
        v-for="product in section.produtos"
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
