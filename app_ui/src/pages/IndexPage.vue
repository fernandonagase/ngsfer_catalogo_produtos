<template>
  <q-page class="flex flex-center">
    <q-list>
      <q-item v-for="product in productStore.products" :key="product.id">
        <q-item-section>
          <q-item-label>{{ product.name }}</q-item-label>
          <q-item-label caption>R$ {{ product.price }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'

export default defineComponent({
  name: 'IndexPage',
  preFetch({ store }) {
    const productStore = useProductStore(store)

    return productStore.fetchAllProducts()
  },
  setup() {
    const tenantStore = useTenantStore()
    const productStore = useProductStore()

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
