<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <Data />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <Geometries />
      </v-col>
      <v-col cols="3">
        <Aesthetics />
      </v-col>
      <v-col cols="2">
        <Columns />
      </v-col>
      <v-col cols="5">
        <PlotView />
        <!-- <v-col>
          <Spec />
        </v-col> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getInstanceId,
  setDefaultInstanceId,
  setInstanceId,
} from '~/plugins/instanceId'
import Aesthetics from '~/components/Aesthetics'
import Columns from '~/components/Columns'
import Geometries from '~/components/Geometries'
import PlotView from '~/components/PlotView'
// import Spec from '~/components/Spec'

export default {
  name: 'Homepage',
  components: {
    Aesthetics,
    Columns,
    Geometries,
    PlotView,
    // Spec,
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
