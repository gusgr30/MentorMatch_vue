import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=> import("../views/HomeView.vue")
  },
  {
    path: '/mentor/:id',
    name: 'mentorDetail',
    component: ()=> import("../views/MentorDetailView.vue")
  },
  {
    path: '/mis-mentorias',
    name: 'misMentorias',
    component: ()=> import("../views/MisMentoriasView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router