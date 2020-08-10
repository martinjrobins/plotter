<template>
  <v-row no-gutters>
    <v-col cols="3">
      <v-subheader>{{ name }}</v-subheader>
    </v-col>
    <v-col cols="9">
      <draggable
        v-model="aesMap"
        :group="{ name: 'aesthetics', put: true }"
        :sort="true"
        tag="v-expansion-panels"
        :component-data="getComponentData()"
      >
        <Column
          v-for="(column, i) in aesMap"
          :name="column.name"
          :index="i"
          :aesthetic="name"
          :key="column.name"
          type="aesthetic"
        >
        </Column>
        <v-card-text
          v-if="aesMap.length == 0"
          slot="footer"
          class="footer-item"
        >
          Add
        </v-card-text>
      </draggable>
    </v-col>
  </v-row>
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
        const geometry = this.$store.getters['geometries/geometry']
        return geometry.aesthetics[this.name]
      },
      set(value) {
        this.$store.commit('geometries/updateAesthetics', [this.name, value])
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
