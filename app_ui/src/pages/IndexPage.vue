<template>
  <q-page padding>
    <FeaturedCategories
      :categories="categoryStore.featuredCategories"
      class="q-mx-auto q-mb-xl"
      :class="{ 'layout-container': $q.screen.gt.sm }"
    />
    <div class="layout-container q-mx-auto">
      <SectionSummary
        v-for="section in sectionStore.homeSections"
        :key="section.id"
        :section="section"
        @go-to-product-details="goToProductDetails"
      />
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'

import FeaturedCategories from 'src/components/FeaturedCategories.vue'
import { useCategoryStore } from 'src/stores/category-store'
import { useSectionStore } from 'src/stores/section-store'
import SectionSummary from 'src/components/SectionSummary.vue'

const sortOptions = [
  { value: null, label: 'Em alta' },
  { value: 'preco-asc', label: 'Preço: menor para maior' },
  { value: 'preco-desc', label: 'Preço: maior para menor' },
  { value: 'nome-asc', label: 'Nome: A-Z' },
  { value: 'nome-desc', label: 'Nome: Z-A' },
]

export default defineComponent({
  name: 'IndexPage',
  props: {
    categorySlug: {
      type: String,
      required: false,
    },
  },
  components: {
    FeaturedCategories,
    SectionSummary,
  },
  preFetch({ store, currentRoute }) {
    const productStore = useProductStore(store)
    productStore.readParams({
      ...currentRoute.query,
      categorySlug: currentRoute.params.categorySlug,
    })
    const categoryStore = useCategoryStore(store)
    const sectionStore = useSectionStore(store)

    return Promise.all([
      productStore.fetchAllProducts(),
      categoryStore.fetchFeaturedCategories(),
      sectionStore.fetchHomeSections(),
    ])
  },
  setup() {
    const router = useRouter()
    // const route = useRoute()
    const tenantStore = useTenantStore()
    const productStore = useProductStore()
    const categoryStore = useCategoryStore()
    const sectionStore = useSectionStore()

    const page = ref(1)
    const sortBy = ref(sortOptions[0])

    function goToProductDetails(productSlug) {
      router.push({ name: 'produto-detalhes', params: { productSlug } })
    }

    onBeforeRouteUpdate((to) => {
      const { page, pageSize, sort, search } = to.query
      if (!page && !pageSize && !sort && !search) {
        productStore.$reset()
      }
    })

    const tenantIdentifier = computed(() => tenantStore.identifier)
    const pageCount = computed(() => productStore.pagination.pageCount)

    return {
      productStore,
      categoryStore,
      sectionStore,
      page,
      sortOptions,
      sortBy,
      pageCount,
      goToProductDetails,
      tenantIdentifier,
    }
  },
})
</script>
