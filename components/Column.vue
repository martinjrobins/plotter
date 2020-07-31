<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ name }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-select hide-details v-model="type" :items="columnTypes" label="type">
      </v-select>
      <v-select
        hide-details
        v-if="aesthetic"
        v-model="aggregate"
        :items="aggregateOps"
        label="aggregate"
        clearable
      >
      </v-select>
      <v-text-field
        v-if="aesthetic"
        v-model="title"
        label="Title"
      ></v-text-field>
      <v-checkbox v-if="aesthetic" v-model="bin" label="bin" dense></v-checkbox>
      <v-text-field
        v-if="aesthetic && bin"
        v-model="maxbins"
        type="number"
        label="maxbins"
        style="width: 60px;"
      ></v-text-field>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { columnTypes, columnProperties } from '~/constants/aesthetics'
import { aggregateOps } from '~/constants/aggregate'

export default {
  name: 'Column',
  props: {
    name: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    aesthetic: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    columnTypes() {
      return columnTypes
    },
    aggregateOps() {
      return Object.keys(aggregateOps)
    },
    geometry() {
      return this.$store.getters['geometries/geometry']
    },
    column() {
      if (this.aesthetic === '') {
        return this.$store.state.dataset.columns[this.index]
      } else {
        return this.geometry.aesthetics[this.aesthetic][this.index]
      }
    },
    ...columnProperties.reduce((map, prop) => {
      map[prop.name] = {
        get() {
          return this.column[prop.name]
        },
        set(value) {
          this.setColumnData([this.index, prop.name, value])
        },
      }
      return map
    }, {}),
  },
  methods: {
    setColumnData(args) {
      console.log('set column', name, args)
      if (this.aesthetic === '') {
        this.$store.commit('dataset/setColumn', args)
      } else {
        this.$store.commit(
          'geometries/setAestheticColumnProperty',
          [this.aesthetic].concat(args)
        )
      }
    },
  },
}
</script>
