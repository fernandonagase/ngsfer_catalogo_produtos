import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    product: null,
    pagination: {
      pageCount: null,
    },
  }),
  actions: {
    async fetchAllProducts({ page = 1, pageSize = 15 } = {}) {
      try {
        const ret = await this.$api.get('/api/v2/produtos', {
          params: { include: 'marca,categorias', page, pageSize },
        })
        this.products = ret.data.data
        this.pagination.pageCount = ret.data.pageCount
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    async fetchById(productId) {
      try {
        const ret = await this.$api.get(`/api/v1/produtos/${productId}`, {
          params: { include: 'marca,categorias' },
        })
        this.product = ret.data
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error)
      }
    },
    async fetchBySlug(productSlug) {
      try {
        const ret = await this.$api.get(`/api/v2/produtos/${productSlug}`, {
          params: { include: 'marca,categorias' },
        })
        this.product = ret.data
      } catch (error) {
        console.error(`Error fetching product with slug ${productSlug}:`, error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
