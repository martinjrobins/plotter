<template>
  <v-container fluid>
    <v-row class="ml-0" justify="center">
      <v-col cols="6" class="pt-0 pb-0">
        <v-row class="ml-0" justify="left">
          <v-card class="pa-2" outlined tile>
            <Dataset></Dataset>
          </v-card>
        </v-row>
        <v-row class="ml-0" justify="left">
          <v-card class="pa-2" outlined tile>
            <Geometry></Geometry>
            bottom left
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="6" class="pt-0 pb-0">
        <v-card class="pa-2" outlined tile>
          <PlotView></PlotView>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Dataset from '~/components/Dataset'
import Geometry from '~/components/Geometry'
import PlotView from '~/components/PlotView'

export default {
  name: 'Homepage',
  components: {
    Dataset,
    Geometry,
    PlotView,
  },
  created() {
    this.$store.dispatch('dataset/loadData')
  },
}
</script>
