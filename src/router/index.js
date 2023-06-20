import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homePage",
      component:  () => import("../views/HomePage.vue")
    },
    {
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
      component: () => import("../views/Shop.vue"),
    },
    {
      // 商城-全部商品
      path: "/shop_all",
      name: "shop_all",
      component: () => import("../views/Shop_All.vue"),
    },
    {
      // 商城-商品詳細頁
      path: "/shop_details/:productId",
      name: "shop_details",
      component: () => import("../views/Shop_Details.vue"),
    },
    {
      // 商品頁後台
      path: "/product",
      name: "product",
      component: () => import("../views/Product.vue"),
      children: [

      ]
    },
    {
      // 商品頁後台
      path: "/animalAdoptionReview",
      name: "animalAdoptionReview",
      component: () => import("../views/AnimalAdoptionReview.vue")
    },
    {
      // 新增動物
      path: "/animalAdd",
      name: "animalAdd",
      component: () => import("../views/AnimalAdd.vue")
    },
    {
      // 購物車
      path: "/cart",
      name: "cart",
      component: () => import("../views/Cart.vue")
    },
    {
      // 結帳頁面
      path: "/checkout",
      name: "checkout",
      component: () => import("../views/Checkout.vue")
    },
  ]
})

export default router
