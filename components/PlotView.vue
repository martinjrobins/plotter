<template>
  <pre>
    {{ vegaSpecString }}
  </pre>
</template>

<script>
import { aestheticsToScalesMapping } from '~/constants/aesthetics'

const dataName = 'table'

export default {
  name: 'PlotView',
  data() {
    return {
      vegaPreamble: {
        $schema: 'https://vega.github.io/schema/vega/v5.json',
        description: 'description goes here...',
        width: 400,
        height: 200,
        padding: 5,
      },
    }
  },
  computed: {
    dataUrl() {
      return this.$store.state.dataset.url
    },
    aesMap() {
      return this.$store.state.dataset.aestheticsMap
    },
    vegaData() {
      return {
        data: { name: dataName, type: 'csv', url: this.dataUrl },
      }
    },
    vegaSpecString() {
      return JSON.stringify(this.vegaSpec, null, 2)
    },
    vegaSpec() {
      return Object.assign(
        {},
        this.vegaPreamble,
        this.vegaData,
        this.vegaScales,
        this.vegaAxis
      )
    },
    vegaScales() {
      return {
        scales: Object.keys(this.aesMap)
          .filter((key) => {
            return this.aesMap[key].length > 0
          })
          .map((key) => {
            return {
              name: aestheticsToScalesMapping[key],
              domain: { data: dataName, field: this.aesMap[key][0] },
            }
          }),
      }
    },
    vegaAxis() {
      return {
        axes: [
          { orient: 'bottom', scale: 'xscale' },
          { orient: 'left', scale: 'yscale' },
        ],
      }
    },
  },
}
</script>
