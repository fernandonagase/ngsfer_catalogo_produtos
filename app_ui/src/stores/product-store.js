import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    product: null,
    pagination: {
      pageCount: null,
      page: 1,
      pageSize: 15,
    },
    filters: {
      search: null,
      sort: null,
      categorySlug: null,
    },
  }),
  actions: {
    readParams({ page = 1, pageSize = 15, search = null, sort = null, categorySlug = null } = {}) {
      this.pagination.page = Number(page)
      this.pagination.pageSize = Number(pageSize)
      this.filters.search = search
      this.filters.sort = sort
      this.filters.categorySlug = categorySlug
    },
    async _fetchAllProducts({
      page = 1,
      pageSize = 15,
      search,
      sort = null,
      categorySlug = null,
    } = {}) {
      try {
        const ret = await this.$api.get('/api/v3/produtos', {
          params: {
            include: 'marca,categorias,ProdutoImagem',
            page: page > 1 ? page : undefined,
            pageSize: pageSize !== 15 ? pageSize : undefined,
            sort: sort || undefined,
            search: search || undefined,
            categoria: categorySlug || undefined,
          },
        })
        this.products = ret.data.data
        this.pagination.pageCount = ret.data.pageCount
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    async fetchAllProducts() {
      await this._fetchAllProducts({
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        search: this.filters.search,
        sort: this.filters.sort,
        categorySlug: this.filters.categorySlug,
      })
    },
    async fetchById(productId) {
      try {
        const ret = await this.$api.get(`/api/v1/produtos/${productId}`, {
          params: { include: 'marca,categorias,ProdutoImagem' },
        })
        this.product = ret.data
      } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error)
      }
    },
    async fetchBySlug(productSlug) {
      try {
        const ret = await this.$api.get(`/api/v2/produtos/${productSlug}`, {
          params: { include: 'marca,categorias,ProdutoImagem' },
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
