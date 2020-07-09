<template>
  <div>
    <v-subheader>{{ name }}</v-subheader>
    <draggable
      v-model="aesMap"
      :group="{ name: 'aesthetics', put: true }"
      :sort="false"
    >
      <Column
        v-for="(column, i) in aesMap"
        :name="column.name"
        :index="i"
        :aesthetic="name"
        :key="column.name"
        class="list-group-item"
      >
      </Column>
      <v-card-text
        v-if="aesMap.length == 0"
        slot="footer"
        class="list-group-item footer-item"
      >
        Add
      </v-card-text>
    </draggable>
    <v-divider :inset="inset"></v-divider>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Aesthetic',
  components: {
    draggable,
  },
  props: {
    name: String,
  },
  data() {
    return {}
  },
  computed: {
    aesMap: {
      get() {
        return this.$store.state.dataset.aestheticsMap[this.name]
      },
      set(value) {
        this.$store.commit('dataset/setAestheticMap', [this.name, value])
      },
    },
  },
}
</script>
