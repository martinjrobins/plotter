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
    <v-card-subtitle>
      Add layers to plot
    </v-card-subtitle>
    <v-expansion-panels flat hover>
      <Geometry
        v-for="(geometry, i) in geometries"
        :key="i"
        :name="geometry.name"
        :index="i"
      >
      </Geometry>
    </v-expansion-panels>
    <v-overflow-btn
      v-model="addGeometrySelected"
      :items="supportedGeometries"
      item-value="name"
      label="Add new geometry"
      flat
      filled
      prepend-icon="mdi-plus"
      @input="addGeometry"
    >
      <template v-slot:item="{ item, attrs, on }">
        <v-list-item v-bind="attrs" v-on="on">
          <v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title
              :id="attrs['aria-labelledby']"
              v-text="item.name"
            ></v-list-item-title>

            <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
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
      return geometries
    },
    supportedGeometriesNames() {
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
