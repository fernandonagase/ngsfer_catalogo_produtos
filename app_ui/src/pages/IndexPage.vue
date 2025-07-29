<template>
  <q-page class="flex flex-center">
    <div class="row q-col-gutter-md container">
      <div v-for="product in productStore.products" :key="product.id" class="col-xs-12 col-sm-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2">R$ {{ product.price }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn color="primary" label="Ver detalhes" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useMeta } from 'quasar'

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

<style lang="scss" scoped>
.container {
  width: min(80%, 800px);
}
</style>
