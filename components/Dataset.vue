<template>
  <v-row>
    <v-col cols="6" class="pt-0 pb-0">
      <h2>Unassigned</h2>
      <v-divider></v-divider>
      <draggable
        class="list-group"
        v-model="unassignedColumns"
        :group="{ name: 'aesthetics', pull: 'clone', put: true }"
        :sort="false"
      >
        <transition-group type="transition">
          <div
            class="list-group-item"
            v-for="column in unassignedColumns"
            :key="column"
          >
            {{ column }}
          </div>
        </transition-group>
      </draggable>
    </v-col>
    <v-col cols="6" class="pt-0 pb-0">
      <Aesthetic
        v-for="aesthetic in aestheticsNames"
        v-bind:name="aesthetic"
        v-bind:key="aesthetic"
      ></Aesthetic>
    </v-col>
  </v-row>
</template>

<script>
import draggable from 'vuedraggable'
import { aestheticsNames } from '~/constants/aesthetics'

export default {
  name: 'Dataset',
  components: {
    draggable,
  },
  data() {
    return {}
  },
  computed: {
    aestheticsNames() {
      return aestheticsNames
    },
    unassignedColumns: {
      get() {
        return this.$store.state.dataset.unassignedColumns
      },
      set(value) {
        console.log('changing unassigned', value)
        this.$store.commit('dataset/setUnassignedColumns', value)
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
