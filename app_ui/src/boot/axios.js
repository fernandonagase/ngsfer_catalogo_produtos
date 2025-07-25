import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

import { useTenantStore } from 'src/stores/tenant-store';

export default defineBoot(({ app, ssrContext, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  let api = null;
  if (process.env.SERVER) {
    api = axios.create({ baseURL: ssrContext.req.tenant.api })
    ssrContext.api = api
  } else {
    const tenantStore = useTenantStore(store);
    api = axios.create({ baseURL: tenantStore.api });
  }
  store.use(() => ({ $api: api }))

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})
