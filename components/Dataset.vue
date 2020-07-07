<template>
  <div>
    <Aesthetic
      v-for="aesthetic in aestheticNames"
      v-bind:name="aesthetic"
      v-bind:key="aesthetic"
    ></Aesthetic>
    <draggable v-model="unassignedColumns">
      <div v-for="column in unassignedColumns" :key="column">
        {{ column }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { aestheticsNames } from '~/constants/aesthetics'

export default {
  name: 'Dataset',
  components: {
    draggable,
  },
  data() {
    return {}
  },
  computed: {
    unassignedColumns: {
      get() {
        return this.$store.state.dataset.unassignedColumns
      },
      set(value) {
        console.log('changing unassigned', value)
        this.$store.commit('dataset/setUnassignedColumns', value)
      },
    },
    aestheticsMap: {
      get() {
        return this.$store.state.dataset.aestheticsMap
      },
      set(value) {
        console.log('changing map', value)
        this.$store.commit('dataset/setAestheticsMap', value)
      },
    },
  },
}
</script>
