import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({}),
  actions: {
    async fetchAllProducts() {
      try {
        console.log(this.$api?.baseURL)
        await this.$api.get('/products')
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    getBaseUrl() {
      console.log('Base URL:', this.$api?.defaults.baseURL)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
