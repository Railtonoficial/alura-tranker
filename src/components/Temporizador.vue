<template>
    <div class="is-flex is-justify-content-space-between">
        <Cronomento :tempoEmSegundos="tempoEmSegundos" />
        <button class="button" @click="iniciar" :disabled="cronomentroRodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronomentroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronomento from './Cronometro.vue';

export default defineComponent({
  name: 'AppTemporizador',
  emits: ['aoTemporizadorFinalizado'],
  components: {
    Cronomento
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronomentro: 0,
      cronomentroRodando: false
    };
  },
  methods: {
    iniciar () {
        this.cronomentroRodando = true;
        this.cronomentro = setInterval(() => {
            this.tempoEmSegundos += 1;  
        }, 1000);
    },
    finalizar () {
        this.cronomentroRodando = false;
        clearInterval(this.cronomentro);
        this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
        this.tempoEmSegundos = 0;
    }
  }
});
</script>