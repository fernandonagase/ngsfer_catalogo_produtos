import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTenantStore = defineStore('tenantStore', {
  state: () => ({
    identifier: null,
    subdomain: null,
    api: null,
  }),
  getters: {},
  actions: {
    setIdentifier(identifier) {
      this.identifier = identifier
    },
    setTenant(tenant) {
      this.subdomain = tenant.subdomain
      this.api = tenant.api
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTenantStore, import.meta.hot))
}
