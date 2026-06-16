import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/LoginView.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/student/HomeView.vue"),
    meta: { requiresAuth: true, rol: "student" },
  },
  {
    path: "/mentor/:id",
    name: "mentorDetail",
    component: () => import("../views/student/MentorDetailView.vue"),
    meta: { requiresAuth: true, rol: "student" },
  },
  {
    path: "/mis-mentorias",
    name: "misMentorias",
    component: () => import("../views/student/MisMentoriasView.vue"),
    meta: { requiresAuth: true, rol: "student" },
  },
  {
    path: "/portal/dashboard",
    name: "mentorDashboard",
    component: ()=> import("../views/mentor/MentorDashboardView.vue"),
    meta: { requiresAuth: true, rol: "mentor" },
  },
  {
    path: "/portal/agenda",
    name: "mentorAgenda",
    component: ()=> import("../views/mentor/MentorAgendaView.vue"),
    meta: { requiresAuth: true, rol: "mentor" },
  },
  {
    path: "/portal/perfil",
    name: "userPerfil",
    component: ()=> import("../views/ProfileView.vue"),
    meta: { requiresAuth: true},
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: () => {
      const authStore = useAuthStore()
      return authStore.isMentor ? { name: "mentorDashboard" } : { name: "home" }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: "login" };
  }
  if (to.name === "login" && authStore.isLoggedIn) {
    return authStore.isMentor ? { name: "mentorDashboard" } : { name: "home" };
  }
  if (to.meta.rol && to.meta.rol !== authStore.user?.rol) {
    return authStore.isMentor ? { name: "mentorDashboard" } : { name: "home" };
  }
});

export default router;
