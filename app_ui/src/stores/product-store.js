import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    product: null,
  }),
  actions: {
    async fetchAllProducts() {
      try {
        const ret = await this.$api.get('/api/v1/produtos')
        this.products = ret.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    async fetchById(productId) {
      try {
        const ret = await this.$api.get(
          `/api/v1/produtos/${productId}`,
          { params: { include: 'marca,categorias' } }
        )
        this.product = ret.data
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error)
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
