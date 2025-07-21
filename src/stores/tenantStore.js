import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTenantStore = defineStore('tenantStore', {
  state: () => ({
    identifier: null,
  }),
  getters: {},
  actions: {
    setIdentifier(identifier) {
      this.identifier = identifier
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTenantStore, import.meta.hot))
}
