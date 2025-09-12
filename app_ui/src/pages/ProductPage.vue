<template>
  <q-page padding>
    <div class="layout-container q-mx-auto">
      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-xs-12 col-sm-7">
          <ProductImageViewer :images="produto.imagens" class="q-pa-md" />
        </div>
        <div class="col-xs-12 col-sm-5">
          <h1 class="text-h4 q-mb-sm">{{ produto.nome }}</h1>
          <p v-if="produto.marca">Marca: {{ produto.marca.nome }}</p>
          <p class="text-h5 text-weight-bold">
            {{ formatCurrencyFromCents(produto.preco) }}
          </p>
          <q-btn
            color="green"
            icon="fa-brands fa-whatsapp"
            size="lg"
            label="Pedir pelo WhatsApp"
            :href="mensagemWhatsapp"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
      <h2 class="text-h5 q-mb-xs">Sobre o produto</h2>
      <p class="text-body1">{{ produto.descricao }}</p>
      <h3 class="text-h6 q-mb-sm">Categorias</h3>
      <div class="q-gutter-sm">
        <router-link
          v-for="categoria in produto.categorias"
          :key="categoria.id"
          :to="{ name: 'produto-categoria', params: { categorySlug: categoria.slug } }"
        >
          {{ categoria.nome }}
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useMeta } from 'quasar'

import { useProductStore } from 'src/stores/product-store'
import { formatCurrencyFromCents } from 'src/helpers/currency.js'
import { useTenantStore } from 'src/stores/tenant-store'
import ProductImageViewer from 'src/components/ProductImageViewer.vue'

export default defineComponent({
  name: 'ProductPage',
  props: {
    productId: {
      type: String,
      required: true,
    },
    productSlug: {
      type: String,
      required: true,
    },
  },
  components: {
    ProductImageViewer,
  },
  preFetch({ store, currentRoute }) {
    const productStore = useProductStore(store)
    return productStore.fetchBySlug(currentRoute.params.productSlug)
  },
  setup(props) {
    const productStore = useProductStore()
    const tenantStore = useTenantStore()

    useMeta({
      title: `${productStore.product.nome} - ${tenantStore.nomeLoja}`,
    })

    const whatsappPedidos = computed(() => tenantStore.whatsappPedidos)
    const urlProduto = computed(() => `${tenantStore.frontEndUrl}/produtos/${props.productSlug}`)
    const mensagemWhatsapp = computed(
      () =>
        `https://wa.me/${whatsappPedidos.value}?text=Olá, gostaria de saber mais sobre o produto ${productStore.product.nome} [${productStore.product.slug}] ${urlProduto.value}`,
    )

    return {
      produto: productStore.product,
      whatsappPedidos,
      urlProduto,
      mensagemWhatsapp,
      formatCurrencyFromCents,
    }
  },
})
</script>
