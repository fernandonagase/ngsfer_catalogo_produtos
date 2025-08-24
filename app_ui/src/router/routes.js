const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'produto-lista', component: () => import('pages/IndexPage.vue') },
      {
        path: '/produtos/:productSlug',
        name: 'produto-detalhes',
        component: () => import('pages/ProductPage.vue'),
        props: true,
      },
      {
        path: '/categorias/:categorySlug',
        name: 'produto-categoria',
        component: () => import('src/pages/CategoryPage.vue'),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
