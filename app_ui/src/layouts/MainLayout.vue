<template>
  <q-layout view="lhh Lpr lff">
    <q-header :class="{ 'q-py-lg': $q.screen.gt.sm, 'q-py-md': $q.screen.lt.md }">
      <div class="layout-container flex q-mx-auto" :class="{ 'items-center': $q.screen.lt.md }">
        <a href="/">
          <q-img
            :src="tenantStore.urlLogoLoja"
            :ratio="1"
            :width="$q.screen.gt.sm ? '150px' : '80px'"
            :height="$q.screen.gt.sm ? '150px' : '80px'"
            class="empresa-logo"
            no-spinner
          />
        </a>
        <div class="q-ml-lg">
          <a class="empresa-nome text-h6 text-white q-mb-xs" href="/">{{ tenantStore.nomeLoja }}</a>
          <p class="text-subtitle2">{{ tenantStore.descricaoLoja }}</p>
        </div>
        <q-space />
        <div
          :class="{
            flex: $q.screen.lt.md,
            'flex-center': $q.screen.lt.sm,
            'full-width': $q.screen.lt.md,
            'q-mt-md': $q.screen.lt.md,
          }"
        >
          <q-input
            v-model="searchText"
            type="search"
            label="Procurar produto..."
            standout
            dark
            class="search-input"
            :dense="$q.screen.lt.md"
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
        <address
          v-if="
            tenantStore.empresa.whatsappContato ||
            tenantStore.empresa.telefoneContato ||
            tenantStore.empresa.emailContato
          "
          class="footer__contato q-mb-md"
        >
          <h2 class="text-h6 q-mt-none q-mb-xs">Entre em contato:</h2>
          <p v-if="tenantStore.empresa.whatsappContato" class="q-mb-none">
            WhatsApp:
            <a :href="`https://wa.me/${tenantStore.empresa.whatsappContato}`" class="text-white">
              {{ maskPhoneNumber(tenantStore.empresa.whatsappContato) }}
            </a>
          </p>
          <p v-if="tenantStore.empresa.telefoneContato" class="q-mb-none">
            Telefone:
            <a :href="`tel:${tenantStore.empresa.telefoneContato}`" class="text-white">
              {{ maskPhoneNumber(tenantStore.empresa.telefoneContato) }}
            </a>
          </p>
          <p v-if="tenantStore.empresa.emailContato" class="q-mb-none">
            E-mail:
            <a :href="`mailto:${tenantStore.empresa.emailContato}`" class="text-white">
              {{ tenantStore.empresa.emailContato }}
            </a>
          </p>
        </address>
        <section class="row justify-between items-end">
          <div>
            <p class="q-mb-none">{{ tenantStore.nomeLoja }}</p>
            <p class="q-mb-none">
              {{ tenantStore.empresa.nome }}, {{ tenantStore.empresa.endereco }}
            </p>
            <p class="q-mb-none">CNPJ: {{ maskDocument(tenantStore.empresa.documento) }}</p>
          </div>
          <div
            v-if="
              tenantStore.empresa.instagram ||
              tenantStore.empresa.facebook ||
              tenantStore.empresa.youtube ||
              tenantStore.empresa.tiktok ||
              tenantStore.empresa.twitter ||
              tenantStore.empresa.linkedin
            "
            class="q-gutter-sm"
          >
            <a
              v-if="tenantStore.empresa.instagram"
              :href="`https://www.instagram.com/${encodeURIComponent(tenantStore.empresa.instagram)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-icon"
            >
              <q-icon name="fa-brands fa-square-instagram" size="sm" />
            </a>
            <a
              v-if="tenantStore.empresa.facebook"
              :href="`https://www.facebook.com/${encodeURIComponent(tenantStore.empresa.facebook)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-icon"
            >
              <q-icon name="fa-brands fa-square-facebook" size="sm" />
            </a>
            <a
              v-if="tenantStore.empresa.youtube"
              :href="`https://www.youtube.com/${encodeURIComponent(tenantStore.empresa.youtube)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-icon"
            >
              <q-icon name="fa-brands fa-square-youtube" size="sm" />
            </a>
            <a
              v-if="tenantStore.empresa.tiktok"
              :href="`https://www.tiktok.com/${encodeURIComponent(tenantStore.empresa.tiktok)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-icon"
            >
              <q-icon name="fa-brands fa-tiktok" size="xs" />
            </a>
            <a
              v-if="tenantStore.empresa.twitter"
              :href="`https://x.com/${encodeURIComponent(tenantStore.empresa.twitter)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-icon"
            >
              <q-icon name="fa-brands fa-square-x-twitter" size="sm" />
            </a>
            <a
              v-if="tenantStore.empresa.linkedin"
              :href="`https://www.linkedin.com/${encodeURIComponent(tenantStore.empresa.linkedin)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-icon"
            >
              <q-icon name="fa-brands fa-linkedin" size="sm" />
            </a>
          </div>
        </section>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

import { useTenantStore } from 'src/stores/tenant-store'
import { useProductStore } from 'src/stores/product-store'
import { maskDocument, maskPhoneNumber } from 'src/helpers/format.js'

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
      maskDocument,
      maskPhoneNumber,
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

.footer__contato {
  font-style: normal;
}

.footer__social-icon {
  color: #fff;
  display: inline-block;
  transition: translate 0.2s;

  &:hover {
    translate: 0 -2px;
  }
}
</style>
