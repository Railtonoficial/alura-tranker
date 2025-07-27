import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Terafas from '../views/Tarefas.vue'
import Projetos from "@/views/Projetos.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Terafas
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: Projetos
  },
]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador;