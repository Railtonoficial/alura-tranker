import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Terafas from '../views/Tarefas.vue'
import Projetos from "@/views/Projetos.vue";
import Formulario from "@/views/Projetos/Formulario.vue";
import Lista from "@/views/Projetos/Lista.vue";

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Terafas
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: Lista
      },
      {
        path: 'novo',
        name: 'Novo Projeto',
        component: Formulario
      },
      {
        path: ':id',
        name: 'Editar Projeto',
        component: Formulario,
        props: true
      },
    ]
  } 
]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador;