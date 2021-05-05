<template>
  <v-card outlined>
    <v-card-title class="py-3 text-h6 font-weight-bold bg-grey">
      <v-icon :color="primaryBlue" class="pr-1">
        mdi-table
      </v-icon>
      Columns
    </v-card-title>
    <v-divider />
    <v-card-subtitle>Drag columns to an aesthetic</v-card-subtitle>
    <v-card-text>
      <v-expansion-panels class="pb-2" />
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
        hide-details
        class="py-2"
        @input="addColumn"
      />
      <v-text-field
        v-model="calculateExpression"
        class="pt-2"
        label="Calculate new field"
        append-icon="mdi-plus"
        persistent-hint
        hint="e.g. '2*datum.fieldName'"
        filled
        @click:append="addCalculateField"
      >
        <template #message="{message}">
          <span>
            {{ message }}
            <a
              href="https://vega.github.io/vega/docs/expressions"
              target="_blank"
            >
              (syntax)
            </a>
          </span>
        </template>
      </v-text-field>
      <v-text-field
        v-model="filterExpression"
        label="Filter data"
        hint="e.g. 'datum.fieldName > 60'"
        filled
        persistent-hint
      >
        <template #message="{message}">
          <span>
            {{ message }}
            <a
              href="https://vega.github.io/vega/docs/expressions"
              target="_blank"
            >
              (syntax)
            </a>
          </span>
        </template>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
import Column from '~/components/Column'
import draggable from 'vuedraggable'
import { primaryBlue } from '~/static/js/colours'

export default {
  name: 'Columns',
  components: {
    draggable,
    Column,
  },
  data() {
    return { primaryBlue, calculateExpression: null, addColumnSelected: null }
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
