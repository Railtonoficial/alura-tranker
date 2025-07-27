import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Terafas from '../views/Tarefas.vue'

const rotas: RouteRecordRaw[] = [{
  path: '/',
  name: 'Tarefas',
  component: Terafas
}]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador;