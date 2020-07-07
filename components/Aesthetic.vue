<template>
  <draggable v-model="map">
    <div v-for="column in map" :key="column">
      {{ column }}
    </div>
  </draggable>
</template>

<script>
export default {
  name: 'Aesthetic',
  props: ['name'],
  data() {
    return {}
  },
  computed: {
    map: {
      get() {
        return this.$store.state.dataset.aestheticsMap[this.name]
      },
      set(value) {
        this.$store.commit('dataset/setAestheticMap', {this.name, value})
      },
    },
  },
}
</script>
