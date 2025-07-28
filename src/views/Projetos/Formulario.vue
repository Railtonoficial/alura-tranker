<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do Projeto
        </label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interface/INotificacao';
import { useStore } from '@/store';
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';
import useNotificador from '@/hooks/notificador'

export default defineComponent({
  name: 'AppFormulario',
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  mounted() {
    if(this.id) {
      const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data() {
    return {
      nomeDoProjeto: '',
    };
  },
  methods: {
    salvar() {
      if(this.id) {
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
      }
      
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso!')
      this.$router.push( '/projetos' );
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador()

    return {
      store,
      notificar
    };
  },
});
</script>