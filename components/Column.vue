<template>
  <v-expansion-panel>
    <v-expansion-panel-header disable-icon-rotate>
      {{ name }}
      <template v-slot:actions>
        <v-btn icon @click="removeColumn">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-icon>$expand</v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <Option
        v-for="option in columnProperties"
        :key="option.name"
        :option="option"
        :index="index"
        :aesthetic="aesthetic"
        :type="type"
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
    type: {
      type: String,
      default: 'column',
    },
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
  computed: {
    columnProperties() {
      return columnProperties
    },
  },
  methods: {
    removeColumn() {
      this.$store.dispatch('removeColumn', [
        this.type,
        this.index,
        this.aesthetic,
      ])
    },
  },
}
</script>
