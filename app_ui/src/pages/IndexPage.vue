<template>
  <q-page padding>
    <div class="layout-container q-mx-auto">
      <template v-if="productStore.products.length > 0">
        <div class="q-mb-md flex">
          <q-select
            v-model="productStore.filters.sort"
            :options="sortOptions"
            label="Classificar por"
            filled
            class="sort-by-select"
            emit-value
            map-options
          />
        </div>
        <div class="row q-col-gutter-md">
          <div
            v-for="product in productStore.products"
            :key="product.id"
            class="col-xs-12 col-sm-3"
          >
            <ProductCard :product="product" class="product-card" @click:card="goToProductDetails">
              <template #actions>
                <q-btn
                  color="primary"
                  label="Ver detalhes"
                  unelevated
                  :to="{ name: 'produto-detalhes', params: { productSlug: product.slug } }"
                />
              </template>
            </ProductCard>
          </div>
        </div>
        <div class="flex justify-center">
          <q-pagination
            v-model="productStore.pagination.page"
            :max="pageCount"
            direction-links
            boundary-links
            class="q-mt-lg"
          />
        </div>
      </template>
      <div v-else class="text-center q-mt-lg">
        <p class="text-h6">Nenhum produto encontrado.</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMeta } from 'quasar'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'

import ProductCard from 'src/components/ProductCard.vue'

const sortOptions = [
  { value: null, label: 'Em alta' },
  { value: 'preco-asc', label: 'Preço: menor para maior' },
  { value: 'preco-desc', label: 'Preço: maior para menor' },
  { value: 'nome-asc', label: 'Nome: A-Z' },
  { value: 'nome-desc', label: 'Nome: Z-A' },
]

export default defineComponent({
  name: 'IndexPage',
  components: {
    ProductCard,
  },
  preFetch({ store, currentRoute }) {
    const productStore = useProductStore(store)
    productStore.readParams(currentRoute.query)
    return productStore.fetchAllProducts()
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const tenantStore = useTenantStore()
    const productStore = useProductStore()

    const page = ref(1)
    const sortBy = ref(sortOptions[0])

    useMeta({
      title: `${tenantStore.subdomain} - Catálogo`,
    })

    function goToProductDetails(productSlug) {
      router.push({ name: 'produto-detalhes', params: { productSlug } })
    }

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
