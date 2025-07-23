import { defineSsrMiddleware } from '#q-app/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.TENANT_API_URL })

async function getTenantData(tenant) {
  try {
    const response = await api.get(`/tenant`, { headers: { 'x-tenant-id': tenant } })
    return response.data
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return null
  }
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/ssr-middleware
export default defineSsrMiddleware(({ app, resolve /*, resolveUrlPath, publicPath, render */ }) => {
  app.all(resolve.urlPath('*'), async (req, res, next) => {
    const tenantSubdomain = req.headers.host.split(':')[0].split('.')[0]
    const tenant = await getTenantData(tenantSubdomain)
    if (!tenant) {
      res.status(404).send('404 | Page Not Found')
    } else {
      req.tenant = tenant
      next()
    }
  })
})
