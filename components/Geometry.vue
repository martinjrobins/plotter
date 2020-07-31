<template>
  <v-expansion-panel
    v-on:click="selectGeometry"
    prepend-icon="mdi-chart-scatter-plot"
  >
    <v-expansion-panel-header color="headerColor">
      Geo {{ index }}: {{ type }}
      <template v-slot:actions>
        <v-icon v-if="index == selectedIndex" color="accent"
          >mdi-image-filter-vintage</v-icon
        >
        <v-icon v-if="index != selectedIndex">$expand</v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-select v-model="type" :items="geometryNames" :dense="true"> </v-select>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
    headerColor() {
      if (this.index === this.selectedIndex) {
        return 'secondary'
      } else {
        return null
      }
    },
    geometryNames() {
      return geometryNames
    },
    selectedIndex() {
      return this.$store.state.geometries.selectedGeometry
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
  methods: {
    selectGeometry() {
      this.$store.commit('geometries/setSelectedGeometry', this.index)
    },
  },
}
</script>
