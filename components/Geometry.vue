<template>
  <div>
    <v-select
      prepend-icon="mdi-chart-scatter-plot"
      v-model="type"
      :items="geometryNames"
      :dense="true"
    >
    </v-select>
  </div>
</template>

<script>
import { geometryNames } from '~/constants/geometries'

export default {
  name: 'Geometry',
  props: {
    index: Number,
  },
  data() {
    return {}
  },
  computed: {
    geometryNames() {
      return geometryNames
    },
    data() {
      return this.$store.state.geometries.geometries[this.index]
    },
    type: {
      get() {
        return this.data.type
      },
      set(value) {
        this.$store.commit('geometries/setGeometryType', [this.index, value])
      },
    },
  },
}
</script>
