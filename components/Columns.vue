<template>
  <v-card class="pa-2">
    <v-card-title>Columns</v-card-title>
    <v-card-subtitle>Drag columns to an aesthetic</v-card-subtitle>
    <v-list>
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
      </draggable>
    </v-list>
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
