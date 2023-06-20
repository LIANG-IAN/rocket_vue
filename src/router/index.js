import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: () => import("../views/HomePage.vue")
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
      // 動物-詳細
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
      // 商城前台=====================================================
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
    },
    {
      // 商品頁後台-詳細
      path: "/product_details/:productId",
      name: "product_details",
      component: () => import("../views/Product_Details.vue"),
    },
    {
      // 商品頁後台-新增
      path: "/product_add/",
      name: "product_add",
      component: () => import("../views/Product_Add.vue"),
    },
    {
      // 購物車 =====================================================
      path: "/cart",
      name: "cart",
      component: () => import("../views/Cart.vue")
    },
  ]
})

export default router
