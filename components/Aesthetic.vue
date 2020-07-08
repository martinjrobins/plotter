<template>
  <div>
    <h2>{{ name }}</h2>
    <v-divider></v-divider>
    <draggable
      v-model="aesMap"
      :group="{ name: 'aesthetics', put: true }"
      :sort="false"
    >
      <div v-for="column in aesMap" :key="column" class="list-group-item">
        {{ column }}
      </div>
      <div
        v-if="aesMap.length == 0"
        slot="footer"
        class="list-group-item footer-item"
      >
        Add
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Aesthetic',
  components: {
    draggable,
  },
  props: {
    name: String,
  },
  data() {
    return {}
  },
  computed: {
    aesMap: {
      get() {
        return this.$store.state.dataset.aestheticsMap[this.name]
      },
      set(value) {
        this.$store.commit('dataset/setAestheticMap', [this.name, value])
      },
    },
  },
}
</script>
