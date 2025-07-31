import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTenantStore = defineStore('tenantStore', {
  state: () => ({
    identifier: null,
    subdomain: null,
    api: null,
    nomeLoja: null,
    descricaoLoja: null,
    urlLogoLoja: 'https://picsum.dev/300/300',
  }),
  getters: {},
  actions: {
    setIdentifier(identifier) {
      this.identifier = identifier
    },
    setTenant(tenant) {
      this.subdomain = tenant.subdomain
      this.api = tenant.api
      this.nomeLoja = tenant.nomeLoja
      this.descricaoLoja = tenant.descricaoLoja
      this.urlLogoLoja = tenant.urlLogoLoja || this.urlLogoLoja
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTenantStore, import.meta.hot))
}
