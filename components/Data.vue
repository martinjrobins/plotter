<template>
  <div>
    <v-row dense>
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
          v-model="csvIndex"
          :items="csvFiles"
          item-text="filename"
          item-value="index"
          label="csv file"
        >
          <template v-slot:append-outer>
            <v-btn icon color="primary" @click="downloadFile('csv')">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
        </v-select>
        <v-select
          v-if="mode == 'topojson'"
          v-model="topojsonIndex"
          :items="topojsonFiles"
          item-text="filename"
          item-value="index"
          label="topojson file"
        >
          <template v-slot:append-outer>
            <v-btn icon color="primary" @click="downloadFile('topojson')">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
        </v-select>
        <v-select
          v-if="mode == 'geojson'"
          v-model="geojsonIndex"
          :items="geojsonFiles"
          item-text="filename"
          item-value="index"
          label="geojson file"
        >
          <template v-slot:append-outer>
            <v-btn icon color="primary" @click="downloadFile('geojson')">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
        </v-select>
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
          v-model="topojsonIndex"
          :items="topojsonFiles"
          item-text="filename"
          item-value="index"
          label="topojson file"
        >
          <template v-slot:append-outer>
            <v-btn icon color="primary" @click="downloadFile('topojson')">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
        </v-select>
        <v-select
          v-if="mode == 'csv + geojson'"
          v-model="geojsonIndex"
          :items="geojsonFiles"
          item-text="filename"
          item-value="index"
          label="geojson file"
        >
          <template v-slot:append-outer>
            <v-btn icon color="primary" @click="downloadFile('geojson')">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
        </v-select>
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
    <v-row dense>
      <v-col v-if="csvError">
        <v-alert type="error" dense>
          {{ csvError }}
        </v-alert>
      </v-col>
      <v-col v-if="topojsonError">
        <v-alert type="error" dense>
          {{ topojsonError }}
        </v-alert>
      </v-col>
      <v-col v-if="geojsonError">
        <v-alert type="error" dense>
          {{ geojsonError }}
        </v-alert>
      </v-col>
      <v-col v-if="syncError">
        <v-alert type="error" dense>
          {{ syncError }}
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import fileDownload from 'js-file-download'
import { aggregateOps } from '~/constants/aggregate'

export default {
  name: 'Data',
  components: {},
  data() {
    return {}
  },
  computed: {
    csvError() {
      return this.$store.state.dataset.csvError
    },
    topojsonError() {
      return this.$store.state.dataset.topojsonError
    },
    geojsonError() {
      return this.$store.state.dataset.geojsonError
    },
    syncError() {
      return this.$store.state.syncError
    },
    csvFiles() {
      return this.$store.state.dataset.csvFiles.map((x, i) => {
        return { ...x, index: i }
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
    topojsonFiles() {
      return this.$store.state.dataset.topojsonFiles.map((x, i) => {
        return { ...x, index: i }
      })
    },
    geojsonFiles() {
      return this.$store.state.dataset.geojsonFiles.map((x, i) => {
        return { ...x, index: i }
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
        this.$store.commit('dataset/setCsvIndex', 0)
        this.$store.commit('dataset/setGeoIndex', 0)
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
    csvIndex: {
      get() {
        return this.$store.state.dataset.csvIndex
      },
      set(value) {
        this.$store.commit('dataset/setCsvIndex', value)
        this.$store.commit('dataset/setCsvId', '')
        this.$store.dispatch('dataset/loadCsvData').then(() => {
          if (this.mode === 'csv + topojson') {
            this.$store.commit('dataset/addGeoField')
          }
        })
      },
    },
    topojsonIndex: {
      get() {
        return this.$store.state.dataset.geoIndex
      },
      set(value) {
        this.$store.commit('dataset/setGeoIndex', value)
        this.$store.commit('dataset/setGeoId', '')
        this.$store.dispatch('dataset/loadTopojsonData')
      },
    },
    geojsonIndex: {
      get() {
        return this.$store.state.dataset.geoIndex
      },
      set(value) {
        this.$store.commit('dataset/setGeoIndex', value)
        this.$store.commit('dataset/setGeoId', '')
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
        const idColumn = this.$store.state.dataset.columnsInDataFile.filter(
          (c) => {
            return c.name === value
          }
        )[0]
        console.log(idColumn)
        // const detailAesthetic = aesthetics.filter((a) => {
        //   return a.name === 'detail'
        // })[0]
        // console.log(detailAesthetic)
        this.$store.commit('geometries/addAesthetic', 'detail')
        this.$store.commit('geometries/updateAesthetics', [
          'detail',
          [idColumn],
        ])
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
  methods: {
    downloadFile(type) {
      let urlString = ''
      if (type === 'csv') {
        urlString = this.csvFiles[this.csvIndex].url
      } else if (type === 'topojson') {
        urlString = this.topojsonFiles[this.topojsonIndex].url
      } else if (type === 'geojson') {
        urlString = this.geojsonFiles[this.geojsonIndex].url
      }

      const filename = urlString.substring(urlString.lastIndexOf('/') + 1)
      axios.get(urlString, {}).then((res) => {
        // topojson or geojson files will be objects
        if (typeof res.data === 'object' && res.data !== null) {
          fileDownload(JSON.stringify(res.data, null, 2), filename)
        } else {
          fileDownload(res.data, filename)
        }
      })
    },
  },
}
</script>
