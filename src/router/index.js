import { createRouter, createWebHistory } from "vue-router"

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
    }
  ]
})

export default router
