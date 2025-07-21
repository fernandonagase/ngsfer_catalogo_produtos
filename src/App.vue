<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

import { useTenantStore } from './stores/tenantStore'

export default defineComponent({
  name: 'App',
  preFetch({ store, ssrContext }) {
    const tenantStore = useTenantStore(store)
    if (ssrContext.req.tenant) {
      // Com as informações do tenant no contexto SSR, elas serão injetadas
      // no tenantStore. De alguma forma, também precisaremos informar ao axios
      // como ele deve requisitar o contexto do tenant
      tenantStore.setIdentifier(ssrContext.req.tenant)
    }
  },
})
</script>
