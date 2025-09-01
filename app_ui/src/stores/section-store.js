import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSectionStore = defineStore('sectionStore', {
  state: () => ({
    homeSections: [],
  }),
  getters: {},
  actions: {
    async fetchHomeSections() {
      try {
        const ret = await this.$api.get('api/v3/secoes', { params: { ativo: true } })
        this.homeSections = ret.data.data
      } catch (error) {
        console.error('Error fetching home sections:', error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSectionStore, import.meta.hot))
}
