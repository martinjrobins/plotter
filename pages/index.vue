<template>
  <v-container fluid>
    <v-row>
      <v-text-field
        v-model="url"
        label="URL"
        hint="enter a url to a csv file"
      ></v-text-field>
    </v-row>
    <v-row>
      <v-col cols="3">
        <Geometries></Geometries>
      </v-col>
      <v-col cols="3">
        <Aesthetics></Aesthetics>
      </v-col>
      <v-col cols="2">
        <Columns></Columns>
      </v-col>
      <v-col cols="4">
        <v-row>
          <v-col>
            <PlotView></PlotView>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Spec></Spec>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Columns from '~/components/Columns'
import Aesthetics from '~/components/Aesthetics'
import Geometries from '~/components/Geometries'
import PlotView from '~/components/PlotView'
import Spec from '~/components/Spec'

export default {
  name: 'Homepage',
  components: {
    Aesthetics,
    Columns,
    Geometries,
    PlotView,
    Spec,
  },
  created() {
    this.$store.dispatch('dataset/loadData')
  },
  computed: {
    url: {
      get() {
        return this.$store.state.dataset.url
      },
      set(value) {
        this.$store.commit('dataset/setUrl', value)
        this.$store.dispatch('dataset/loadData')
      },
    },
  },
}
</script>
