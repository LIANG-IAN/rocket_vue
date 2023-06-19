import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 動物全覽
      path: "/animalAllFiles",
      name: "animalAllFiles",
      component: () => import("../views/AnimalAllFiles.vue")
    },
    {
      // 動物領養
      path: "/animalAdoption",
      name: "animalAdoption",
      component: () => import("../views/AnimalAdoption.vue")
    },
    {
      // 動物修改
      path: "/animalModifyAndDelete",
      name: "animalModifyAndDelete",
      component: () => import("../views/AnimalModifyAndDelete.vue")
    },
    {
      // 商城前台
      path: "/shop",
      name: "shop",
      component: () => import("../views/Shop_All.vue")
    },
    {
      // 商品頁後台
      path: "/product",
      name: "product",
      component: () => import("../views/Product_All.vue")
    },
    {
      // 商品頁後台
      path: "/animalAdoptionReview",
      name: "animalAdoptionReview",
      component: () => import("../views/AnimalAdoptionReview.vue")
    },
  ]
})

export default router
