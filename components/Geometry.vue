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
        <v-icon>$expand</v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-select v-model="type" :items="supportedGeometries" :dense="true">
      </v-select>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { geometries } from '~/constants/geometries'

export default {
  name: 'Geometry',
  props: {
    index: Number,
  },
  data() {
    return {}
  },
  computed: {
    supportedGeometries() {
      return geometries.map((geo) => {
        return geo.name
      })
    },
    headerColor() {
      if (this.index === this.selectedIndex) {
        return 'secondary'
      } else {
        return null
      }
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
