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
    <draggable
      v-model="columns"
      :group="{ name: 'aesthetics', pull: 'clone', put: true }"
      :sort="false"
      tag="v-expansion-panels"
      :component-data="getComponentData()"
    >
      <Column
        v-for="(column, i) in columns"
        :name="column.name"
        :index="i"
        :key="column.name"
      >
      </Column>
      <v-card-actions slot="footer" key="footer">
        <v-btn @click="calculate">calculate</v-btn>
      </v-card-actions>
    </draggable>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable'
import Column from '~/components/Column'

export default {
  name: 'Dataset',
  components: {
    draggable,
    Column,
  },
  data() {
    return {}
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