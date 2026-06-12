import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import { useAuthStore } from "./stores/auth.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const authStore = useAuthStore();
//llamamos al init() antes de que el router empiece a navegar, no en el App asi restaura la sesion antes de montar el app. 
await authStore.init();

app.mount("#app");
