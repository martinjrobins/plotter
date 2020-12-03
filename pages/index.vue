<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <Data> </Data>
      </v-col>
    </v-row>
    <v-row class="mt-0 pt-0">
      <v-col class="ma-0 pa-0" cols="2">
        <Geometries></Geometries>
      </v-col>
      <v-col class="mt-0 pt-0" cols="3">
        <Aesthetics></Aesthetics>
      </v-col>
      <v-col class="mt-0 pt-0" cols="2">
        <Columns></Columns>
      </v-col>
      <v-col class="mt-0 pt-0" cols="5">
        <v-row>
          <v-col class="mt-0 pt-0">
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
import {
  setInstanceId,
  setDefaultInstanceId,
  getInstanceId,
} from '~/static/js/instanceId'

export default {
  name: 'Homepage',
  components: {
    Aesthetics,
    Columns,
    Geometries,
    PlotView,
    Spec,
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
  created() {
    this.$store.dispatch('loadStore')
    if (this.$route.query.instanceId) {
      setInstanceId(this.$route.query.instanceId)
      console.log('set instanceId via url query to', getInstanceId())
    } else {
      setDefaultInstanceId().then(() => {
        console.log('using default instanceId of', getInstanceId())
      })
    }
  },
}
</script>
