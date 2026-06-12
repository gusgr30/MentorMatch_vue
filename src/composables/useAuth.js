import { computed } from "vue";
import { useAuthStore } from "../stores/auth.js";
//es una capa delgada sobre el store. 
// La ventaja es que en los componentes importás useAuth en vez de useAuthStore directamente, 
// lo que es más limpio y desacopla los componentes de Pinia.
export function useAuth() {
  const store = useAuthStore();

  const user = computed(() => store.user);
  const isLoggedIn = computed(() => store.isLoggedIn);
  const isStudent = computed(() => store.isStudent);
  const isMentor = computed(() => store.isMentor);
  const loading = computed(() => store.loading);
  const error = computed(() => store.error);

  async function login(email, password) {
    return store.login(email, password);
  }

//TODO: agregar resiter
  function logout() {
    return store.logout();
  }

  return {
    user,
    isLoggedIn,
    isStudent,
    isMentor,
    loading,
    error,
    login,
    // register,
    logout,
  };
}
