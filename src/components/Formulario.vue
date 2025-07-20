<template>
    <div class="box">
        <div class="columns ">
            <div class="comlumn is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';

export default defineComponent({
  name: 'AppFormulario',
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador
  },
  data() {
    return {
      descricao: ''
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
        this.$emit('aoSalvarTarefa', {
            duracaoEmSegundos: tempoDecorrido,
            descricao: this.descricao
        });

        this.descricao = '';

        this.$nextTick(() => {
            const input = this.$el.querySelector('input');
            if (input) {
                input.focus();
            }
        });
    }
  }
});
</script>

<style>
.formulario {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>