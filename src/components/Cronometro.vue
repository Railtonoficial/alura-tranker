<template>
  <section>
    <strong class="display">
      {{ tempoDecorrido }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppCronometro',
  props: {
    tempoEmSegundos: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tempoDecorrido () : string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8)
    }
  },
})
</script>

<style scoped>
.display {
  color: var(--texto-primario);
}
</style>