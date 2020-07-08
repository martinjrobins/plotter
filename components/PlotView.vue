<template>
  <div>
    <VegaEmbed :spec="vegaSpec" />
    <pre>
    {{ vegaSpecString }}
  </pre
    >
  </div>
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
    vegaMark() {
      return 'line'
    },
    vegaData() {
      return {
        name: dataName,
        type: 'csv',
        url: this.dataUrl,
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
        { mark: this.vegaMark },
        { encoding: this.vegaEncoding }
      )
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
          }
          return map
        }, {})
    },
    validPlot() {
      return this.aesMap.x.length > 0 && this.aesMap.y.length > 0
    },
  },
}
</script>
