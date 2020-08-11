<template>
  <v-card class="pa-1">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="10">
          Columns
        </v-col>
        <v-col cols="2">
          <v-icon color="primary">mdi-table</v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>Drag columns to an aesthetic</v-card-subtitle>
    <VExpansionPanels />
    <draggable
      v-model="columns"
      :group="{ name: 'aesthetics', pull: 'clone', put: true }"
      :sort="false"
      tag="VExpansionPanels"
      :component-data="getComponentData()"
    >
      <Column
        v-for="(column, i) in columns"
        :name="column.name"
        :index="i"
        type="column"
        :key="column.name"
      >
      </Column>
    </draggable>
    <v-text-field
      v-model="calculateExpression"
      label="Add new field"
      prepend-icon="mdi-plus"
      v-on:click:prepend="addCalculateField"
      hint='for example: "2*datum.fieldName"'
      filled
    ></v-text-field>
    <v-text-field
      v-model="filterExpression"
      label="Filter data"
      hint='for example: "datum.fieldName > 60"'
      filled
    ></v-text-field>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import { VExpansionPanels } from 'vuetify/lib'
import Column from '~/components/Column'

export default {
  name: 'Dataset',
  components: {
    draggable,
    Column,
    VExpansionPanels,
  },
  data() {
    return { calculateExpression: null }
  },
  computed: {
    columns: {
      get() {
        return this.$store.state.dataset.columns
      },
      set(value) {
        this.$store.commit('dataset/setColumns', value)
      },
    },
    filterExpression: {
      get() {
        return this.$store.state.dataset.filter
      },
      set(value) {
        this.$store.commit('dataset/setFilter', value)
      },
    },
  },
  methods: {
    calculate() {
      this.$store.commit('dateset/calculate')
    },
    getComponentData() {
      return {
        attrs: {
          flat: true,
          hover: true,
        },
      }
    },
    addCalculateField(mouseEvent) {
      this.$store.commit('dataset/addCalculateField', this.calculateExpression)
      this.$nextTick(() => {
        this.calculateExpression = null
      })
    },
  },
}
</script>

<style>
.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.footer-item {
  opacity: 50%;
}
</style>
