<template>
  <v-row>
    <v-col cols="6" class="pt-0 pb-0">
      <h2>Columns</h2>
      <v-divider />
      <draggable
        v-model="columns"
        class="list-group"
        :group="{ name: 'aesthetics', pull: 'clone', put: true }"
        :sort="false"
      >
        <transition-group type="transition">
          <Column
            v-for="(column, i) in columns"
            :key="column.name"
            :name="column.name"
            :index="i"
            class="list-group-item"
          />
        </transition-group>
      </draggable>
    </v-col>
    <v-col cols="6" class="pt-0 pb-0">
      <Aesthetic
        v-for="aesthetic in aestheticsNames"
        :key="aesthetic"
        :name="aesthetic"
      />
    </v-col>
  </v-row>
</template>

<script>
import Aesthetic from '~/components/Dataset'
import { aestheticsNames } from '~/constants/aesthetics'
import Column from '~/components/Column'
import draggable from 'vuedraggable'

export default {
  name: 'Dataset',
  components: {
    draggable,
    Column,
    Aesthetic,
  },
  data() {
    return {}
  },
  computed: {
    aestheticsNames() {
      return aestheticsNames
    },
    columns: {
      get() {
        return this.$store.state.dataset.columns
      },
      set(value) {
        console.log('changing columns', value)
        this.$store.commit('dataset/setColumns', value)
      },
    },
    aestheticsMap: {
      get() {
        return this.$store.state.dataset.aestheticsMap
      },
      set(value) {
        console.log('changing map', value)
        this.$store.commit('dataset/setAestheticsMap', value)
      },
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
