<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada"">
      <div class="column is-4">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import Box from './Box.vue'
import ITarefa from "@/interface/ITarefa";

export default defineComponent({
  name: "AppTarefa",
  emits: ['aoTarefaClicada'],
  components: {
    Cronometro,
    Box
  },
  methods: {
    tarefaClicada () : void {
      this.$emit('aoTarefaClicada', this.tarefa)
    }
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  }
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>