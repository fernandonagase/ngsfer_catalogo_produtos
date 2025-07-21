import { defineSsrMiddleware } from '#q-app/wrappers'

function checkIfTenantIsValid(tenant) {
  // Aqui, provavelmente, será feita uma requisição para verificar se o tenant
  // existe e, se sim, retornar as informações do tenant
  return tenant === 'teste'
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/ssr-middleware
export default defineSsrMiddleware(({ app, resolve /*, resolveUrlPath, publicPath, render */ }) => {
  app.all(resolve.urlPath('*'), (req, res, next) => {
    const tenant = req.headers.host.split(':')[0].split('.')[0]
    if (!checkIfTenantIsValid(tenant)) {
      res.status(404).send('404 | Page Not Found')
    } else {
      req.tenant = tenant
      next()
    }
  })
})
