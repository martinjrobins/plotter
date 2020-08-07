<template>
  <v-card class="pa-1">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="10">
          Geometries
        </v-col>
        <v-col cols="2">
          <v-icon color="primary">mdi-shape-plus</v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>Add layers to plot</v-card-subtitle>
    <v-expansion-panels flat hover>
      <Geometry
        v-for="(geometry, i) in geometries"
        :name="geometry.name"
        :index="i"
        :key="i"
      >
      </Geometry>
    </v-expansion-panels>
    <v-overflow-btn
      v-model="addGeometrySelected"
      :items="supportedGeometries"
      label="Add new geometry"
      flat
      filled
      prepend-icon="mdi-plus"
      v-on:input="addGeometry"
    >
    </v-overflow-btn>
  </v-card>
</template>

<script>
import { geometries } from '~/constants/geometries'

export default {
  name: 'Geometries',
  components: {},
  data() {
    return { addGeometrySelected: null }
  },
  computed: {
    supportedGeometries() {
      return geometries.map((geo) => {
        return geo.name
      })
    },
    data() {
      return this.$store.state.geometries.geometries[this.index]
    },
    geometries: {
      get() {
        return this.$store.state.geometries.geometries
      },
      set(value) {
        this.$store.commit('geometries/setGeometries', value)
      },
    },
  },
  methods: {
    addGeometry(name) {
      this.$store.commit('geometries/addGeometry', name)
      this.$nextTick(() => {
        this.addGeometrySelected = null
      })
    },
    getComponentData() {
      return {
        attrs: {
          flat: true,
          hover: true,
        },
      }
    },
  },
}
</script>
