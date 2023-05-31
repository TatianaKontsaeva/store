
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/IndexPage.vue") },
      { path: "/catalog/", component: () => import("src/pages/Catalog.vue") },
      { path: "/cart/", component: () => import("src/pages/Cart.vue") },
      // {
      //   path: "/:id/",
      //   name: "V-productPage",
      //   props: true,
      //   component: () => import("src/pages/ProductPage.vue"),
      // },
      {
        path: "/help/",
        props: true,
        component: () => import("src/pages/Help.vue"),
      },
      {
        path: "/about/",
        props: true,
        component: () => import("src/pages/About.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
