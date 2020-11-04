<template>
  <v-card class="pa-1 bg-grey">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="10">
          Aesthetics
        </v-col>
        <v-col cols="2">
          <v-icon color="primary">mdi-image-filter-vintage</v-icon>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>Map columns to visual properies</v-card-subtitle>
    <v-list class="bg-grey">
      <Aesthetic
        v-for="aesthetic in currentAesthetics"
        :key="aesthetic"
        :name="aesthetic"
      ></Aesthetic>
    </v-list>
    <v-overflow-btn
      v-model="addAestheticSelected"
      :items="aesthetics"
      item-value="name"
      label="Add new aesthetic"
      flat
      filled
      prepend-icon="mdi-plus"
      @input="addAesthetic"
    >
      <template v-slot:item="{ item, attrs, on }">
        <v-list-item v-bind="attrs" v-on="on">
          <v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title
              :id="attrs['aria-labelledby']"
              v-text="item.name"
            ></v-list-item-title>

            <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-overflow-btn>
  </v-card>
</template>

<script>
import Aesthetic from '~/components/Aesthetic'
import { aesthetics } from '~/constants/aesthetics'

export default {
  name: 'Dataset',
  components: {
    Aesthetic,
  },
  data() {
    return { addAestheticSelected: null }
  },
  computed: {
    currentAesthetics() {
      const geometry = this.$store.getters['geometries/geometry']
      return Object.keys(geometry.aesthetics)
    },
    aesthetics() {
      return aesthetics
    },
  },
  methods: {
    addAesthetic(name) {
      this.$store.commit('geometries/addAesthetic', name)
      this.$nextTick(() => {
        this.addAestheticSelected = null
      })
    },
  },
}
</script>
