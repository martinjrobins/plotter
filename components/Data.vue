<template>
  <v-row>
    <v-col cols="4">
      <v-select v-model="csvUrl" :items="csvUrls" label="csv file"></v-select>
    </v-col>
    <v-col>
      <v-select
        v-model="csvProperty"
        :items="csvProperties"
        label="csv id field"
        clearable
      ></v-select>
    </v-col>
    <v-col cols="4">
      <v-select
        v-model="topojsonUrl"
        :items="topojsonUrls"
        label="topojson file"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        v-model="topojsonProperty"
        :items="topojsonProperties"
        label="topojson id field"
        clearable
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { csvFiles, topojsonFiles } from '~/constants/data'

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
    csvUrl: {
      get() {
        return this.$store.state.dataset.csvUrl
      },
      set(value) {
        this.$store.commit('dataset/setCsvUrl', value)
        this.$store.commit('dataset/setCsvProperty', '')
        this.$store.dispatch('dataset/loadCsvData')
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
      return this.$store.state.dataset.columns.map((c) => {
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
