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
      path: "/animalAdoption",
      name: "animalAdoption",
      component:  () => import("../views/Animal_Adoption.vue")
    }
  ]
})

export default router
