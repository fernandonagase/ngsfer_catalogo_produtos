<template>
  <q-page class="flex flex-center"> Catálogo de produtos {{ tenantIdentifier }} </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue'

import { useTenantStore } from 'src/stores/tenantStore'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const tenantStore = useTenantStore()

    const tenantIdentifier = computed(() => tenantStore.identifier)

    return {
      tenantIdentifier,
    }
  },
})
</script>
