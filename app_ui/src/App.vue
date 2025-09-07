<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useMeta } from 'quasar'

import { useTenantStore } from './stores/tenant-store'

export default defineComponent({
  name: 'App',
  setup() {
    const tenantStore = useTenantStore()

    useMeta({
      title: `${tenantStore.nomeLoja}`,
    })
  },
})
</script>
