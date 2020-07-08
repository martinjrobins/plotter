<template>
  <v-row>
    <v-col>
      {{ name }}
    </v-col>
    <v-col>
      <v-select v-model="type" :items="columnTypes" :dense="true"> </v-select>
    </v-col>
  </v-row>
</template>

<script>
import { columnTypes } from '~/constants/aesthetics'

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
    type: {
      get() {
        if (this.aesthetic === '') {
          return this.$store.state.dataset.columns[this.index].type
        } else {
          return this.$store.state.dataset.aestheticsMap[this.aesthetic][
            this.index
          ].type
        }
      },
      set(value) {
        console.log('set column', this.name, this.index, this.aesthetic)
        if (this.aesthetic === '') {
          this.$store.commit('dataset/setColumnType', [this.index, value])
        } else {
          this.$store.commit('dataset/setAestheticColumnType', [
            this.aesthetic,
            this.index,
            value,
          ])
        }
      },
    },
  },
}
</script>
