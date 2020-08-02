<template>
  <v-card class="pa-1">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="10">
          Aesthetics
        </v-col>
        <v-col cols="2">
          <v-icon color="primary">mdi-image-filter-vintage</v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>Map columns to visual properies</v-card-subtitle>
    <v-list>
      <Aesthetic
        v-for="aesthetic in currentAesthetics"
        v-bind:name="aesthetic"
        v-bind:key="aesthetic"
      ></Aesthetic>
    </v-list>
    <v-overflow-btn
      v-model="addAestheticSelected"
      :items="otherAesthetics"
      label="Add new aesthetic"
      flat
      filled
      prepend-icon="mdi-plus"
      v-on:input="addAesthetic"
    >
    </v-overflow-btn>
  </v-card>
</template>

<script>
import Aesthetic from '~/components/Aesthetic'
import { aestheticsNames } from '~/constants/aesthetics'

export default {
  name: 'Dataset',
  components: {
    Aesthetic,
  },
  data() {
    return { addAestheticSelected: null }
  },
  computed: {
    currentAesthetics() {
      const geometry = this.$store.getters['geometries/geometry']
      return Object.keys(geometry.aesthetics)
    },
    otherAesthetics() {
      const currentAesthetics = this.currentAesthetics
      const availableAesthetics = aestheticsNames
      return availableAesthetics.filter((x) => !currentAesthetics.includes(x))
    },
  },
  methods: {
    addAesthetic(name) {
      this.$store.commit('geometries/addAesthetic', name)
      this.$nextTick(() => {
        this.addAestheticSelected = null
      })
    },
  },
}
</script>
