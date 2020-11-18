<template>
  <v-card class="pa-1">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="10">
          Plot
        </v-col>
        <v-col cols="2">
          <v-icon color="primary">mdi-chart-line</v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <VegaEmbed :spec="vegaSpec" />
  </v-card>
</template>

<script>
export default {
  name: 'PlotView',
  data() {
    return {}
  },
  computed: {
    vegaSpecString() {
      return JSON.stringify(this.vegaSpec, null, 2)
    },
    vegaSpec() {
      // sync to backend everytime we need to regenerate the spec
      this.$store.dispatch('uploadState')
      return this.$store.getters.vegaSpec
    },
  },
}
</script>
