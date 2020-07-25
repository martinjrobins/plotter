<template>
  <v-card class="pa-2">
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
const dataName = 'table'

export default {
  name: 'PlotView',
  data() {
    return {
      vegaPreamble: {},
    }
  },
  computed: {
    dataUrl() {
      return this.$store.state.dataset.url
    },
    aesMap() {
      return this.$store.state.dataset.aestheticsMap
    },
    geometries() {
      return this.$store.state.geometries.geometries
    },
    vegaEncoding() {
      return Object.keys(this.aesMap)
        .filter((key) => {
          return this.aesMap[key].length > 0
        })
        .reduce((map, key) => {
          map[key] = {
            field: this.aesMap[key][0].name,
            type: this.aesMap[key][0].type,
            bin: this.aesMap[key][0].bin,
            aggregate: this.aesMap[key][0].aggregate,
          }
          return map
        }, {})
    },
    vegaLayers() {
      return this.geometries.map((geom) => {
        return {
          mark: geom.type,
          encoding: this.vegaEncoding,
        }
      })
    },
    vegaData() {
      return {
        url: this.dataUrl,
        name: dataName,
        format: {
          type: 'csv',
        },
      }
    },
    vegaSpecString() {
      return JSON.stringify(this.vegaSpec, null, 2)
    },
    vegaSpec() {
      return Object.assign(
        {},
        this.vegaPreamble,
        { data: this.vegaData },
        { layer: this.vegaLayers }
      )
    },
    validPlot() {
      return this.aesMap.x.length > 0 && this.aesMap.y.length > 0
    },
  },
}
</script>
