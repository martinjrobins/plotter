<template>
  <v-card class="pa-1">
    <v-card-title>Plot</v-card-title>
    <v-card-subtitle
      >The generated plot and Vega-Lite specification</v-card-subtitle
    >
    <VegaEmbed :spec="vegaSpec" />
    <pre>
    {{ vegaSpecString }}
  </pre
    >
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
      console.log('SPEC:', this.$store.getters.vegaSpec)
      return this.$store.getters.vegaSpec
    },
  },
}
</script>
