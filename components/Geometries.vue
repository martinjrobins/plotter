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
    <draggable
      v-model="geometries"
      :group="{ name: 'geometries' }"
      tag="v-expansion-panels"
      :component-data="getComponentData()"
    >
      <Geometry
        v-for="(geometry, i) in geometries"
        :name="geometry.name"
        :index="i"
        :key="i"
      >
      </Geometry>
      <v-card-actions slot="footer" key="footer">
        <v-btn @click="add">Add</v-btn>
      </v-card-actions>
    </draggable>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Geometries',
  components: {
    draggable,
  },
  data() {
    return {}
  },
  computed: {
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
    add() {
      this.$store.commit('geometries/addGeometry')
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
