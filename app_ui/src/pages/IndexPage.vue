<template>
  <q-page padding>
    <div class="layout-container q-mx-auto">
      <template v-if="productStore.products.length > 0">
        <div class="row q-col-gutter-md">
          <div
            v-for="product in productStore.products"
            :key="product.id"
            class="col-xs-12 col-sm-4"
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
            v-model="page"
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

export default defineComponent({
  name: 'IndexPage',
  components: {
    ProductCard,
  },
  preFetch({ store, currentRoute }) {
    const productStore = useProductStore(store)

    return productStore.fetchAllProducts({
      page: currentRoute.query.page ? Number(currentRoute.query.page) : 1,
      pageSize: currentRoute.query.pageSize ? Number(currentRoute.query.pageSize) : 15,
      search: currentRoute.query.search,
    })
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const tenantStore = useTenantStore()
    const productStore = useProductStore()

    const page = ref(1)

    useMeta({
      title: `${tenantStore.subdomain} - Catálogo`,
    })

    const pageCount = computed(() => productStore.pagination.pageCount)

    watch(
      () => page.value,
      (newPage) => {
        router.push({ query: { page: newPage, pageSize: route.query.pageSize } })
        productStore.fetchAllProducts({
          page: newPage ? Number(newPage) : 1,
          pageSize: route.query.pageSize ? Number(route.query.pageSize) : 15,
        })
      },
    )

    watch(
      () => route.query.search,
      (newSearch) => {
        productStore.fetchAllProducts({
          page: 1,
          pageSize: route.query.pageSize ? Number(route.query.pageSize) : 15,
          search: newSearch,
        })
      },
    )

    function fetchAllProducts() {
      return productStore.fetchAllProducts()
    }

    function goToProductDetails(productSlug) {
      router.push({ name: 'produto-detalhes', params: { productSlug } })
    }

    const tenantIdentifier = computed(() => tenantStore.identifier)

    return {
      productStore,
      page,
      pageCount,
      fetchAllProducts,
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
</style>
