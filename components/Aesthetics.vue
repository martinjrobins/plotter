<template>
  <v-card class="pa-1">
    <v-card-title>Aesthetics</v-card-title>
    <v-card-subtitle>Map columns to visual properies</v-card-subtitle>
    <v-list>
      <Aesthetic
        v-for="aesthetic in aestheticsNames"
        v-bind:name="aesthetic"
        v-bind:key="aesthetic"
      ></Aesthetic>
    </v-list>
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
    return {}
  },
  computed: {
    aestheticsNames() {
      return aestheticsNames
    },
  },
}
</script>
