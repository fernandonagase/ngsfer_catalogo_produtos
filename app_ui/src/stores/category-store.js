import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    featuredCategories: [],
  }),
  getters: {},
  actions: {
    async _fetchFeaturedCategories() {
      try {
        const ret = await this.$api.get('/api/v3/categorias', {
          params: {
            destaque: true,
          },
        })
        this.featuredCategories = ret.data.data
      } catch (error) {
        console.error('Error fetching featured categories:', error)
      }
    },
    async fetchFeaturedCategories() {
      await this._fetchFeaturedCategories()
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot))
}
