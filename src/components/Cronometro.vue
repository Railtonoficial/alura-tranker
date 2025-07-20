<template>
    <section class="display">
        <strong>{{ tempoEmSegundos }}</strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppCronometro',
  props: {
    tempoEmSegundos: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tempoDecorrido (): string {
        return new Date(this.tempoEmSegundos * 1000).toISOString().substring(11, 8);
    }
  }
});
</script>

<style scoped>
.display {
  color: var(--text-primary);
}
</style>