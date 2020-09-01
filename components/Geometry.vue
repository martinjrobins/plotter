<template>
  <v-expansion-panel
    v-on:click="selectGeometry"
    prepend-icon="mdi-chart-scatter-plot"
  >
    <v-expansion-panel-header
      @mouseover="mouseOver()"
      @mouseleave="mouseLeave()"
      color="headerColor"
      disable-icon-rotate
    >
      <span>
        <v-icon v-text="geometry.icon"></v-icon>
        {{ geometry.name }}
      </span>
      <template v-slot:actions>
        <v-icon v-if="index == selectedIndex" color="accent"
          >mdi-image-filter-vintage</v-icon
        >
        <v-btn @click="removeGeometry" icon> <v-icon>mdi-minus</v-icon> </v-btn>
        <v-icon>$expand</v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <Option
        v-for="option in geometry.options"
        :option="option"
        :index="index"
        type="geometry"
        :key="option.name"
      >
      </Option>
      <v-card-text v-if="geometry.options == 0">
        No options
      </v-card-text>
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
    geometry() {
      return geometries.filter((geo) => {
        return geo.name === this.data.type
      })[0]
    },
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
    type() {
      return this.data.type
    },
  },
  methods: {
    selectGeometry() {
      this.$store.commit('geometries/setSelectedGeometry', this.index)
      this.$store.commit('geometries/setHighlightAesthetics', true)
    },
    removeGeometry() {
      this.$store.dispatch('geometries/removeGeometry', this.index)
    },
    mouseOver() {
      console.log('mouseOver', this.selectedIndex)
      if (this.index === this.selectedIndex) {
        this.$store.commit('geometries/setHighlightAesthetics', true)
      }
    },
    mouseLeave() {
      console.log('mouseLeave', this.selectedIndex)
      if (this.index === this.selectedIndex) {
        this.$store.commit('geometries/setHighlightAesthetics', false)
      }
    },
  },
}
</script>
