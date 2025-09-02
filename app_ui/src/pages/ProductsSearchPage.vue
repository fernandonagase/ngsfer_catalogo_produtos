<template>
  <q-page padding>
    <div class="layout-container q-mx-auto">
      <FeaturedCategories :categories="categoryStore.featuredCategories" class="q-mb-xl" />
      <ProductsList
        :key="productStore.filters.sort"
        :products="productStore.products"
        :page-count="pageCount"
        :initial-sort="$route.query.sort"
        :initial-page="$route.query.page ? parseInt($route.query.page) : 1"
        @go-to-product-details="goToProductDetails"
        @update:page="
          (page) => {
            $router.push({ name: 'produto-lista', query: { ...$route.query, page } })
          }
        "
        @update:sort="onUpdateSort"
      />
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRouter, useRoute } from 'vue-router'
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
  name: 'ProductsSearchPage',
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

    function onUpdateSort(sort) {
      const query = Object.fromEntries(
        Object.entries(route.query).filter(([param]) => !['page', 'sort'].includes(param)),
      )
      if (sort) {
        query.sort = sort
      }
      router.push({ name: 'produto-lista', query })
    }

    onBeforeRouteUpdate((to) => {
      const { page, pageSize, sort, search } = to.query
      if (!page && !pageSize && !sort && !search) {
        productStore.$reset()
      }
    })

    const pageCount = computed(() => productStore.pagination.pageCount)

    watch(
      () => route.query,
      (newQuery) => {
        productStore.readParams(newQuery)
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
      onUpdateSort,
    }
  },
})
</script>
