<template>
  <q-page padding class="flex flex-center">
    <div class="row q-col-gutter-md layout-container">
      <div v-for="product in productStore.products" :key="product.id" class="col-xs-12 col-sm-4">
        <ProductCard :product="product" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useMeta } from 'quasar'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'

import ProductCard from 'src/components/ProductCard.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ProductCard,
  },
  preFetch({ store }) {
    const productStore = useProductStore(store)

    return productStore.fetchAllProducts()
  },
  setup() {
    const tenantStore = useTenantStore()
    const productStore = useProductStore()

    useMeta({
      title: `${tenantStore.subdomain} - Catálogo`,
    })

    function fetchAllProducts() {
      return productStore.fetchAllProducts()
    }

    const tenantIdentifier = computed(() => tenantStore.identifier)

    return {
      productStore,
      fetchAllProducts,
      tenantIdentifier,
    }
  },
})
</script>
