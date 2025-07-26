import { defineBoot } from '#q-app/wrappers'

import { useTenantStore } from 'src/stores/tenant-store'

export default defineBoot(({ ssrContext, store }) => {
  const tenantStore = useTenantStore(store);
  tenantStore.setTenant(ssrContext.req.tenant);
})
