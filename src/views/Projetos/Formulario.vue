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
import { defineComponent } from 'vue';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';

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
        this.store.dispatch(ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        }).then(() => this.lidarComSucesso());
      } else {
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso());
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso!')
      this.$router.push('/projetos');
    }
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