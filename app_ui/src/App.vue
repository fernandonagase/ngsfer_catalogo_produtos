<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

import { useTenantStore } from './stores/tenant-store'

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
    ssrContext.api.get('/').then((response) => {
      // Aqui você pode fazer algo com a resposta da API, se necessário
      console.log('API response:', response.data)
    }).catch((error) => {
      console.error('API request failed:', error)
    })
  },
})
</script>
