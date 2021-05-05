<template>
  <v-card outlined>
    <v-card-title class="py-3 text-h6 font-weight-bold bg-grey">
      <v-icon :color="primaryBlue" class="pr-1">
        mdi-shape-plus
      </v-icon>
      Geometries
    </v-card-title>
    <v-divider />
    <v-card-subtitle>
      Add layers to plot
    </v-card-subtitle>
    <v-card-text>
      <v-expansion-panels flat hover class="pb-2">
        <Geometry
          v-for="(geometry, i) in geometries"
          :key="i"
          :name="geometry.name"
          :index="i"
        />
      </v-expansion-panels>
      <v-overflow-btn
        v-model="addGeometrySelected"
        :items="supportedGeometries"
        item-value="name"
        label="Add new geometry"
        flat
        filled
        hide-details
        class="pt-2"
        @input="addGeometry"
      >
        <template #item="{ item, attrs, on }">
          <v-list-item v-bind="attrs" style="max-width: 600px;" v-on="on">
            <v-list-item-icon>
              <v-icon :color="primaryBlue" v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-content :id="attrs['aria-labelledby']">
              <span>
                <strong>{{ item.name }}</strong> - {{ item.text }}
              </span>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-overflow-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { geometries } from '~/constants/geometries'
import { primaryBlue } from '~/static/js/colours'

export default {
  name: 'Geometries',
  components: {},
  data() {
    return { primaryBlue, addGeometrySelected: null }
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
