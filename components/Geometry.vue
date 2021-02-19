<template>
  <v-expansion-panel
    prepend-icon="mdi-chart-scatter-plot"
    @click="selectGeometry"
  >
    <v-expansion-panel-header :class="headerClass" disable-icon-rotate>
      <span>
        <v-icon v-text="geometry.icon" />
        {{ geometry.name }}
      </span>
      <template #actions>
        <v-icon v-if="index == selectedIndex" color="accent">
          mdi-image-filter-vintage
        </v-icon>
        <v-btn icon @click="removeGeometry">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-icon>$expand</v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <Option
        v-for="option in geometry.options"
        :key="option.name"
        :option="option"
        :index="index"
        type="geometry"
      />
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
    index: {
      type: Number,
      default: 0,
    },
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
    headerClass() {
      if (this.index === this.selectedIndex) {
        return 'bg-grey'
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
  },
}
</script>
