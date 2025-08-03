import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interface/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from "@/http"
import ITarefa from "@/interface/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto"

export interface Estado {
  tarefas: ITarefa[],
  notificacoes: INotificacao[],
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    tarefas: [],
    notificacoes: [],
    projeto : {
      projetos: []
    }
  },
  mutations: {
    
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(tarefa => tarefa.id)
      state.tarefas[index] = tarefa
    },
    [NOTIFICAR](state, novaNotificao: INotificacao) {
      novaNotificao.id = new Date().getTime()
      state.notificacoes.push(novaNotificao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificao.id)
      },3000)
    }
  },
  actions: {
    
    [OBTER_TAREFAS] ({ commit }) {
      http.get('tarefas')
        .then(resposta => commit(DEFINIR_TAREFAS ,resposta.data))
    },
    [CADASTRAR_TAREFA] ( { commit }, tarefa: ITarefa ) {
      return http.post('/tarefas', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa ) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    },
  },
  modules: {
    projeto
  }
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}