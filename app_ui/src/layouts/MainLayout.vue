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
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

import { useTenantStore } from 'src/stores/tenant-store'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const tenantStore = useTenantStore()

    return {
      tenantStore,
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
</style>
