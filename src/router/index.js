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
      component: () => import("../views/Checkout.vue")
    },
      {
          path: "/getorder",
          name: "getorder",
          component: () => import("../views/GetOrder.vue")
      },
    {
      // 登入註冊
      path: "/loginSignup",
      name: "loginSignup",
      component: () => import("../views/LoginSignup.vue"),
      children: [
        {
          // 子路由: /loginSignup/login
          path: "login",
          component: () => import("../components/Login.vue"),
          meta: {
            hideHeaderFooter: true 
          }
        },
        {
          // 子路由: /loginSignup/signup
          path: "signup",
          component: () => import("../components/Signup.vue"),
          meta: {
            hideHeaderFooter: true 
          }
        }]
      },
      {
        // 會員資訊
        path: "/memberInfo",
        name: "memberInfo",
        component:  () => import("../views/MemberInfo.vue")
      },
  ]
})

export default router
