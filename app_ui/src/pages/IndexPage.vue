<template>
  <q-page class="flex flex-center"> Catálogo de produtos {{ tenantIdentifier }} </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue'

import { useTenantStore } from 'src/stores/tenantStore'
import { useProductStore } from 'src/stores/product-store'

export default defineComponent({
  name: 'IndexPage',
  preFetch({ store }) {
    const productStore = useProductStore(store)
    console.log(productStore.getBaseUrl())

    return productStore.fetchAllProducts()
  },
  setup() {
    const tenantStore = useTenantStore()
    const productStore = useProductStore()

    console.log(productStore.getBaseUrl())

    const tenantIdentifier = computed(() => tenantStore.identifier)

    return {
      tenantIdentifier,
    }
  },
})
</script>
