<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-py-lg">
      <div class="layout-container flex q-mx-auto">
        <q-img
          :src="tenantStore.urlLogoLoja"
          :ratio="1"
          width="150px"
          height="150px"
          spinner-size="82px"
          class="empresa-logo"
        />
        <div class="q-ml-lg">
          <p class="text-h6 q-mb-xs">{{ tenantStore.nomeLoja }}</p>
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

import { useTenantStore } from 'src/stores/tenant-store';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const tenantStore = useTenantStore();

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
</style>
