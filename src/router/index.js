import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "animalAllFiles",
      component:  () => import("../views/Animal_All_Files.vue")
    },
    {
      path: "/loginSignup",
      name: "loginSignup",
      component: () => import("../views/Login_Signup.vue"),
      children: [
        {
          // 子路由: /loginSignup/login
          path: "login",
          component: () => import("../components/Login.vue")
        },
        {
          // 子路由: /loginSignup/signup
          path: "signup",
          component: () => import("../components/Signup.vue")
        }
      ]
    },
  ]
})

export default router
