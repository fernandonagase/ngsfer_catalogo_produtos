<template>
  <q-page padding>
    <div class="layout-container q-mx-auto">
      <FeaturedCategories :categories="categoryStore.featuredCategories" class="q-mb-lg" />
      <ProductsList
        :products="productStore.products"
        :page-count="pageCount"
        v-model:sort="productStore.filters.sort"
        v-model:page="productStore.pagination.page"
        @go-to-product-details="goToProductDetails"
      />
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useMeta } from 'quasar'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'

import FeaturedCategories from 'src/components/FeaturedCategories.vue'
import { useCategoryStore } from 'src/stores/category-store'
import ProductsList from 'src/components/ProductsList.vue'

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
    ProductsList,
  },
  preFetch({ store, currentRoute }) {
    const productStore = useProductStore(store)
    productStore.readParams({
      ...currentRoute.query,
      categorySlug: currentRoute.params.categorySlug,
    })
    const categoryStore = useCategoryStore(store)

    return Promise.all([productStore.fetchAllProducts(), categoryStore.fetchFeaturedCategories()])
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const tenantStore = useTenantStore()
    const productStore = useProductStore()
    const categoryStore = useCategoryStore()

    const page = ref(1)
    const sortBy = ref(sortOptions[0])

    useMeta({
      title: `${tenantStore.subdomain} - Catálogo`,
    })

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

    watch(
      [
        () => productStore.filters.sort,
        () => productStore.filters.search,
        () => productStore.pagination.page,
      ],
      ([newSort, newSearch], [oldSort, oldSearch]) => {
        if (newSort !== oldSort || newSearch !== oldSearch) {
          productStore.pagination.page = 1
        }
        router.push({
          query: {
            ...route.query,
            page: productStore.pagination.page > 1 ? productStore.pagination.page : undefined,
            sort: productStore.filters.sort || undefined,
            search: productStore.filters.search || undefined,
          },
        })
        productStore.fetchAllProducts()
      },
    )

    return {
      productStore,
      categoryStore,
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

<style scoped>
.product-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.sort-by-select {
  width: 300px;
}
</style>
