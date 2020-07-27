<template>
  <v-expansion-panel label="test">
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
      <v-checkbox v-if="aesthetic" v-model="bin" label="bin" dense></v-checkbox>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { columnTypes } from '~/constants/aesthetics'
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
    column() {
      if (this.aesthetic === '') {
        return this.$store.state.dataset.columns[this.index]
      } else {
        return this.$store.state.dataset.aestheticsMap[this.aesthetic][
          this.index
        ]
      }
    },
    aggregate: {
      get() {
        return this.column.aggregate
      },
      set(value) {
        this.setColumnData('Aggregate', [this.index, value])
      },
    },
    bin: {
      get() {
        return this.column.bin
      },
      set(value) {
        this.setColumnData('Bin', [this.index, value])
      },
    },
    type: {
      get() {
        return this.column.type
      },
      set(value) {
        this.setColumnData('Type', [this.index, value])
      },
    },
  },
  methods: {
    setColumnData(name, args) {
      console.log('set column', name, args)
      if (this.aesthetic === '') {
        this.$store.commit(`dataset/setColumn${name}`, args)
      } else {
        this.$store.commit(
          `dataset/setAestheticColumn${name}`,
          [this.aesthetic].concat(args)
        )
      }
    },
  },
}
</script>
