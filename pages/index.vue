<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col cols="12">
            <v-card class="pa-2">
              <Dataset></Dataset>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="pa-2">
              <Geometry></Geometry>
              bottom left
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-2">
          <h2>Plot</h2>
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
