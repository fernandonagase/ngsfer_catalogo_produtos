<template>
  <q-layout view="lhh Lpr lff">
    <q-header class="q-py-lg">
      <div class="layout-container flex q-mx-auto">
        <a href="/">
          <q-img
            :src="tenantStore.urlLogoLoja"
            :ratio="1"
            width="150px"
            height="150px"
            class="empresa-logo"
            no-spinner
          />
        </a>
        <div class="q-ml-lg">
          <a class="empresa-nome text-h6 text-white q-mb-xs" href="/">{{ tenantStore.nomeLoja }}</a>
          <p class="text-subtitle2">{{ tenantStore.descricaoLoja }}</p>
        </div>
        <q-space />
        <div>
          <q-input
            v-model="searchText"
            type="search"
            label="Procurar produto..."
            standout
            dark
            class="search-input"
            @keyup.enter="searchProducts(searchText)"
          >
            <template v-slot:append>
              <q-btn flat round icon="search" @click="searchProducts(searchText)" />
            </template>
          </q-input>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <div class="layout-container q-py-lg q-mx-auto">
        <p class="q-mb-none">{{ tenantStore.nomeLoja }}</p>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const tenantStore = useTenantStore()
    const productStore = useProductStore()

    const searchText = ref('')

    function searchProducts(term) {
      productStore.filters.search = term
    }

    return {
      tenantStore,
      productStore,
      searchText,
      searchProducts,
    }
  },
})
</script>

<style lang="scss" scoped>
.empresa-logo {
  border-radius: 50%;
}

.empresa-nome {
  text-decoration: none;
}

.search-input {
  width: 300px;
}
</style>
