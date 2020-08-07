<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      {{ name }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <Option
        v-for="option in columnProperties"
        :option="option"
        :columnIndex="index"
        :aestheticName="aesthetic"
        :key="option.name"
      >
      </Option>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { columnProperties } from '~/constants/aesthetics'

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
    columnProperties() {
      return columnProperties
    },
  },
}
</script>
