<template>
  <q-layout view="lhh Lpr lFf">
    <q-header class="q-py-lg">
      <div class="layout-container flex q-mx-auto">
        <router-link :to="{ name: 'produto-lista' }">
          <q-img
            :src="tenantStore.urlLogoLoja"
            :ratio="1"
            width="150px"
            height="150px"
            spinner-size="82px"
            class="empresa-logo"
          />
        </router-link>
        <div class="q-ml-lg">
          <router-link :to="{ name: 'produto-lista' }" class="empresa-nome">
            <p class="text-h6 text-white q-mb-xs">{{ tenantStore.nomeLoja }}</p>
          </router-link>
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
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useTenantStore } from 'src/stores/tenant-store'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter()
    const tenantStore = useTenantStore()

    const searchText = ref('')

    function searchProducts(term) {
      router.push({ name: 'produto-lista', query: { search: term } })
    }

    return {
      tenantStore,
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
