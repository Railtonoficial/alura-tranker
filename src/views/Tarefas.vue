<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <Box v-if="semTarefas">
      Você não está muito produtivo hoje :(
    </Box>
    <div class="modal" :class="{ 'is-active' : tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button @click="fecharModal" class="delete" arial-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">
              Descrição
            </label>
            <input type="text" class="input" v-model="tarefaSelecionada?.descricao" id="descricaoDaTarefa" />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Salvar alterações</button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'
import Box from '../components/Box.vue'
import { useStore } from 'vuex';
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import ITarefa from '@/interface/ITarefa';


export default defineComponent({
  name: 'AppTarefas',
  components: {
    Formulario,
    Tarefa,
    Box
  },
  data () {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    return {
      tarefas:computed(() => store.state.projetos),
      store
    };
  },
});
</script>