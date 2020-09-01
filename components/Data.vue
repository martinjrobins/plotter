<template>
  <v-row>
    <v-col cols="2">
      <v-select
        v-model="mode"
        :items="availableModes"
        label="what is your input data?"
        hint="selection will reset geometry data"
      >
      </v-select>
    </v-col>
    <v-col cols="3">
      <v-select
        v-if="
          mode == 'csv' || mode == 'csv + topojson' || mode == 'csv + geojson'
        "
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
      <v-select
        v-if="mode == 'geojson'"
        v-model="geojsonUrl"
        :items="geojsonUrls"
        label="geojson file"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        v-if="mode == 'csv + topojson' || mode == 'csv + geojson'"
        v-model="csvId"
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
      <v-select
        v-if="mode == 'csv + geojson'"
        v-model="geojsonUrl"
        :items="geojsonUrls"
        label="geojson file"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        v-if="mode == 'csv + topojson' || mode == 'csv + geojson'"
        v-model="geoId"
        :items="geoProperties"
        label="geometry id field"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { csvFiles, topojsonFiles, geojsonFiles } from '~/constants/data'
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
    geojsonUrls() {
      return geojsonFiles.map((file) => {
        return file.url
      })
    },
    loadCsvProgress() {
      return this.$store.state.dataset.loadCsvProgress
    },
    loadGeoProgress() {
      return this.$store.state.dataset.loadGeoProgress
    },
    availableModes() {
      return ['csv', 'topojson', 'geojson', 'csv + topojson', 'csv + geojson']
    },
    mode: {
      get() {
        return this.$store.state.dataset.mode
      },
      set(value) {
        this.$store.commit('dataset/setMode', value)
        this.$store.commit('dataset/setDefaultGeoUrl', value)
        if (value === 'csv + topojson') {
          this.$store.dispatch('dataset/loadCsvData').then(() => {
            this.$store.commit('dataset/addGeoField')
          })
          this.$store.dispatch('dataset/loadTopojsonData')
        } else if (value === 'csv + geojson') {
          this.$store.dispatch('dataset/loadCsvData').then(() => {
            this.$store.commit('dataset/addGeoField')
          })
          this.$store.dispatch('dataset/loadGeojsonData')
        } else if (value === 'topojson') {
          this.$store.dispatch('dataset/loadTopojsonData')
        } else if (value === 'geojson') {
          this.$store.dispatch('dataset/loadGeojsonData')
        } else {
          this.$store.dispatch('dataset/loadCsvData')
        }
        this.$store.commit('geometries/setDefaultGeometries', value)
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
        return this.$store.state.dataset.geoUrl
      },
      set(value) {
        this.$store.commit('dataset/setGeoUrl', value)
        this.$store.commit('dataset/setTopjsonProperty', '')
        this.$store.dispatch('dataset/loadTopojsonData')
      },
    },
    geojsonUrl: {
      get() {
        return this.$store.state.dataset.geoUrl
      },
      set(value) {
        this.$store.commit('dataset/setGeoUrl', value)
        this.$store.commit('dataset/setTopjsonProperty', '')
        this.$store.dispatch('dataset/loadGeojsonData')
      },
    },
    geoProperties() {
      return this.$store.state.dataset.geoProperties
    },
    csvProperties() {
      return this.$store.state.dataset.columnsInDataFile.map((c) => {
        return c.name
      })
    },
    csvId: {
      get() {
        return this.$store.state.dataset.csvId
      },
      set(value) {
        this.$store.commit('dataset/setCsvId', value)
      },
    },
    geoId: {
      get() {
        return this.$store.state.dataset.geoId
      },
      set(value) {
        this.$store.commit('dataset/setGeoId', value)
      },
    },
  },
}
</script>
