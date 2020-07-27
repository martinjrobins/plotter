<template>
  <v-card class="pa-1">
    <v-card-title>Geometries</v-card-title>
    <v-card-subtitle>Add layers to plot</v-card-subtitle>
    <draggable
      v-model="geometries"
      class="list-group"
      :group="{ name: 'geometries' }"
    >
      <Geometry
        v-for="(geometry, i) in geometries"
        :name="geometry.name"
        :index="i"
        :key="i"
        class="list-group-item"
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
  },
}
</script>
