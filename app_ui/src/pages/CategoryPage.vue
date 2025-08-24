<script setup>
import { computed, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useMeta } from 'quasar'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'

import { useCategoryStore } from 'src/stores/category-store'
import ProductsList from 'src/components/ProductsList.vue'

defineOptions({
  preFetch({ store, currentRoute }) {
    const productStore = useProductStore(store)
    productStore.readParams({
      ...currentRoute.query,
      categorySlug: currentRoute.params.categorySlug,
    })
    const categoryStore = useCategoryStore(store)

    return Promise.all([
      productStore.fetchAllProducts(),
      categoryStore.fetchBySlug(currentRoute.params.categorySlug),
      categoryStore.fetchFeaturedCategories(),
    ])
  },
})

defineProps({
  categorySlug: {
    type: String,
    required: false,
  },
})

const router = useRouter()
const route = useRoute()
const tenantStore = useTenantStore()
const productStore = useProductStore()
const categoryStore = useCategoryStore()

useMeta({
  title: `${tenantStore.subdomain} - Produtos`,
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
</script>

<template>
  <q-page padding>
    <div class="layout-container q-mx-auto">
      <h1 class="text-h4">{{ categoryStore.category.nome }}</h1>
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
