import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "animalAllFiles",
      component: () => import("../views/Animal_All_Files.vue")
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("../views/Shop_All.vue")
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/Product_All.vue")
    },
  ]
})

export default router
