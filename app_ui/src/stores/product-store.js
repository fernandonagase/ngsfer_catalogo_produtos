import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchAllProducts() {
      try {
        const ret = await this.$api.get('/products')
        this.products = ret.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
