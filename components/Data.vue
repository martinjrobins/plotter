<template>
  <v-row>
    <v-col cols="2">
      <v-select
        v-model="mode"
        :items="availableModes"
        label="what is your input data?"
      ></v-select>
    </v-col>
    <v-col cols="3">
      <v-select
        v-if="mode == 'csv' || mode == 'csv + topojson'"
        v-model="csvUrl"
        :items="csvUrls"
        label="csv file"
      ></v-select>
      <v-select
        v-if="mode == 'topojson'"
        v-model="topojsonUrl"
        :items="topojsonUrls"
        label="topojson file"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        v-if="mode == 'csv + topojson'"
        v-model="csvProperty"
        :items="csvProperties"
        label="csv id field"
      ></v-select>
    </v-col>
    <v-col cols="3">
      <v-select
        v-if="mode == 'csv + topojson'"
        v-model="topojsonUrl"
        :items="topojsonUrls"
        label="topojson file"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        v-if="mode == 'csv + topojson'"
        v-model="topojsonProperty"
        :items="topojsonProperties"
        label="topojson id field"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        v-if="mode == 'csv + topojson'"
        v-model="preLookupAgregate"
        :items="availableAggregates"
        label="aggregate for multiple entries"
        clearable
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { csvFiles, topojsonFiles } from '~/constants/data'
import { aggregateOps } from '~/constants/aggregate'

export default {
  name: 'Data',
  components: {},
  data() {
    return {}
  },
  computed: {
    csvUrls() {
      return csvFiles.map((file) => {
        return file.url
      })
    },
    availableAggregates() {
      return Object.keys(aggregateOps)
    },
    preLookupAgregate: {
      get() {
        return this.$store.state.dataset.preLookupAgregate
      },
      set(value) {
        this.$store.commit('dataset/setPrelookupAgregate', value)
      },
    },
    topojsonUrls() {
      return topojsonFiles.map((file) => {
        return file.url
      })
    },
    loadCsvProgress() {
      return this.$store.state.dataset.loadCsvProgress
    },
    loadTopojsonProgress() {
      return this.$store.state.dataset.loadTopojsonProgress
    },
    availableModes() {
      return ['csv', 'topojson', 'csv + topojson']
    },
    mode: {
      get() {
        return this.$store.state.dataset.mode
      },
      set(value) {
        this.$store.commit('dataset/setMode', value)
        if (value === 'csv + topojson') {
          this.$store.dispatch('dataset/loadCsvData').then(() => {
            this.$store.commit('dataset/addGeoField')
          })
          this.$store.dispatch('dataset/loadTopjsonData')
        } else if (value === 'topojson') {
          this.$store.dispatch('dataset/loadTopjsonData')
        } else {
          this.$store.dispatch('dataset/loadCsvData')
        }
      },
    },
    csvUrl: {
      get() {
        return this.$store.state.dataset.csvUrl
      },
      set(value) {
        this.$store.commit('dataset/setCsvUrl', value)
        this.$store.commit('dataset/setCsvProperty', '')
        this.$store.dispatch('dataset/loadCsvData').then(() => {
          if (this.mode === 'csv + topojson') {
            this.$store.commit('dataset/addGeoField')
          }
        })
      },
    },
    topojsonUrl: {
      get() {
        return this.$store.state.dataset.topojsonUrl
      },
      set(value) {
        this.$store.commit('dataset/setTopjsonUrl', value)
        this.$store.commit('dataset/setTopjsonProperty', '')
        this.$store.dispatch('dataset/loadTopjsonData')
      },
    },
    topojsonProperties() {
      return this.$store.state.dataset.topojsonProperties
    },
    csvProperties() {
      return this.$store.state.dataset.columnsInDataFile.map((c) => {
        return c.name
      })
    },
    csvProperty: {
      get() {
        return this.$store.state.dataset.csvProperty
      },
      set(value) {
        this.$store.commit('dataset/setCsvProperty', value)
      },
    },
    topojsonProperty: {
      get() {
        return this.$store.state.dataset.topojsonProperty
      },
      set(value) {
        this.$store.commit('dataset/setTopjsonProperty', value)
      },
    },
  },
}
</script>
