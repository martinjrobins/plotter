<template>
  <v-row align="center" no-gutters>
    <v-col cols="3">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <v-icon v-text="aesthetic.icon" />
            {{ name }}
          </span>
        </template>
        <span>{{ aesthetic.text }}</span>
      </v-tooltip>
    </v-col>
    <v-col cols="9">
      <draggable
        v-model="aesMap"
        :group="{ name: 'aesthetics', put: true }"
        :sort="true"
        tag="v-expansion-panels"
        :component-data="getComponentData()"
      >
        <Column
          v-for="(column, i) in aesMap"
          :key="column.name"
          :name="column.name"
          :index="i"
          :aesthetic="name"
          type="aesthetic"
        />
        <v-card-text v-if="aesMap.length == 0" slot="footer" class="c-grey">
          Add
        </v-card-text>
      </draggable>
    </v-col>
  </v-row>
</template>

<script>
import { aesthetics } from '~/constants/aesthetics'
import Column from './Column'
import draggable from 'vuedraggable'

export default {
  name: 'Aesthetic',
  components: {
    draggable,
    Column,
  },
  props: {
    name: {
      type: String,
      default: 'x',
    },
  },
  data() {
    return {}
  },
  computed: {
    aesthetics() {
      return aesthetics
    },
    aesthetic() {
      return aesthetics.filter((x) => {
        return x.name === this.name
      })[0]
    },
    aesMap: {
      get() {
        const geometry = this.$store.getters['geometries/geometry']
        return geometry.aesthetics[this.name]
      },
      set(value) {
        this.$store.commit('geometries/updateAesthetics', [this.name, value])
      },
    },
  },
  methods: {
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
