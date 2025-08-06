<template>
  <q-page padding class="flex flex-center">
    <div class="row q-col-gutter-md layout-container">
      <div v-for="product in productStore.products" :key="product.id" class="col-xs-12 col-sm-4">
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
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useMeta } from 'quasar'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'

import { formatCurrencyFromCents } from 'src/helpers/currency.js';

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
      formatCurrencyFromCents,
    }
  },
})
</script>
