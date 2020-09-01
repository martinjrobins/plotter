<template>
  <v-card class="pa-1">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="10">
          Vega-Lite Specification
        </v-col>
        <v-col cols="2">
          <v-icon color="primary">mdi-code-json</v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <pre>
    {{ vegaSpecString }}
  </pre
    >
  </v-card>
</template>

<script>
export default {
  name: 'Spec',
  data() {
    return {}
  },
  computed: {
    vegaSpecString() {
      return JSON.stringify(this.vegaSpec, null, 2)
    },
    vegaSpec() {
      return this.$store.getters.vegaSpec
    },
  },
}
</script>
