import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "animalAllFiles",
      component:  () => import("../views/AnimalAllFiles.vue")
    },
    {
      path: "/animalAdoption",
      name: "animalAdoption",
      component:  () => import("../views/AnimalAdoption.vue")
    },
    {
      path: "/animalModifyAndDelete",
      name: "animalModifyAndDelete",
      component:  () => import("../views/AnimalModifyAndDelete.vue")
    },
    {
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
        }
      ]
    },
  ]
})

export default router
