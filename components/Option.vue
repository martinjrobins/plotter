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
    type: {
      type: String,
      default: 'column',
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
    show() {
      if (this.type === 'column') {
        return this.option.showInColumns
      } else {
        return true
      }
    },
    optionValue: {
      get() {
        const args = {
          index: this.index,
          aesthetic: this.aesthetic,
        }
        return this.$store.getters.option(this.type, this.option.name, args)
      },
      set(value) {
        const args = {
          index: this.columnIndex,
          aesthetic: this.aesthetic,
        }
        this.$store.dispatch('setOption', [
          this.type,
          this.option.name,
          args,
          value,
        ])
      },
    },
  },
}
</script>
