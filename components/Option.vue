<template>
  <div>
    <v-select
      hide-details
      v-if="option.type === 'select' && show"
      v-model="optionValue"
      :items="Object.keys(option.options)"
      :label="option.name"
      :clearable="option.optional"
    >
    </v-select>
    <v-text-field
      v-if="option.type === 'textBox' && show"
      v-model="optionValue"
      :label="option.name"
      :clearable="option.optional"
    ></v-text-field>
    <v-text-field
      v-if="option.type === 'textBoxNumber' && show"
      v-model="optionValue"
      :label="option.name"
      type="number"
      :clearable="option.optional"
    ></v-text-field>
    <v-checkbox
      v-if="option.type === 'checkBox' && show"
      v-model="optionValue"
      :label="option.name"
      dense
    ></v-checkbox>
  </div>
</template>

<script>
import { columnProperties } from '~/constants/aesthetics'

export default {
  name: 'Column',
  props: {
    option: {
      type: Object,
      default: () => {
        return columnProperties[0]
      },
    },
    columnIndex: {
      type: Number,
      default: 0,
    },
    aestheticName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    show() {
      if (this.aestheticName === '') {
        return this.option.showInColumns
      } else {
        return true
      }
    },
    geometry() {
      return this.$store.getters['geometries/geometry']
    },
    column() {
      if (this.aestheticName === '') {
        return this.$store.state.dataset.columns[this.columnIndex]
      } else {
        return this.geometry.aesthetics[this.aestheticName][this.columnIndex]
      }
    },
    optionValue: {
      get() {
        return this.column[this.option.name]
      },
      set(value) {
        this.setColumnData([this.columnIndex, this.option.name, value])
      },
    },
  },
  methods: {
    setColumnData(args) {
      console.log('set column', name, args)
      if (this.aestheticName === '') {
        this.$store.commit('dataset/setColumn', args)
      } else {
        this.$store.commit(
          'geometries/setAestheticColumnProperty',
          [this.aestheticName].concat(args)
        )
      }
    },
  },
}
</script>
