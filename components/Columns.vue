<template>
  <v-card class="pa-1">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="10">
          Columns
        </v-col>
        <v-col cols="2">
          <v-icon color="primary">
            mdi-table
          </v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>Drag columns to an aesthetic</v-card-subtitle>
    <v-expansion-panels />
    <draggable
      v-model="columns"
      :group="{ name: 'aesthetics', pull: 'clone', put: true }"
      :sort="false"
      tag="v-expansion-panels"
      :component-data="getComponentData()"
    >
      <Column
        v-for="(column, i) in columns"
        :key="column.name"
        :name="column.name"
        :index="i"
        type="column"
      />
    </draggable>
    <v-overflow-btn
      v-model="addColumnSelected"
      :items="columnsInDataFile"
      label="Add new field"
      flat
      filled
      prepend-icon="mdi-plus"
      @input="addColumn"
    />
    <v-text-field
      v-model="calculateExpression"
      label="Calculate new field"
      prepend-icon="mdi-plus"
      hint="for example: '2*datum.fieldName' <a
      href='https://vega.github.io/vega/docs/expressions'>(syntax}</a>"
      filled
      @click:prepend="addCalculateField"
    >
      <template #message="{ message }">
        <span v-html="message" />
      </template>
    </v-text-field>
    <v-text-field
      v-model="filterExpression"
      label="Filter data"
      hint="for example: 'datum.fieldName > 60' <a
      href='https://vega.github.io/vega/docs/expressions'>(syntax}</a>"
      filled
      persistent-hint
    >
      <template #message="{ message }">
        <span v-html="message" />
      </template>
    </v-text-field>
  </v-card>
</template>

<script>
import Column from '~/components/Column'
import draggable from 'vuedraggable'

export default {
  name: 'Columns',
  components: {
    draggable,
    Column,
  },
  data() {
    return { calculateExpression: null, addColumnSelected: null }
  },
  computed: {
    columnsInDataFile() {
      const cols = this.$store.state.dataset.columnsInDataFile.map((c) => {
        return c.name
      })
      return cols
    },
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
    getComponentData() {
      return {
        attrs: {
          flat: true,
          hover: true,
        },
      }
    },
    addColumn(name) {
      this.$store.commit('dataset/addColumn', name)
      this.$nextTick(() => {
        this.addColumnSelected = null
      })
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
