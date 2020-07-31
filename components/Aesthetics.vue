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
