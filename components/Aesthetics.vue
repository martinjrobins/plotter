<template>
  <v-card outlined>
    <v-card-title class="py-3 text-h6 font-weight-bold bg-grey">
      <v-icon :color="primaryBlue" class="pr-1">
        mdi-image-filter-vintage
      </v-icon>
      Aesthetics
    </v-card-title>
    <v-divider />
    <v-card-subtitle>Map columns to visual properies</v-card-subtitle>
    <v-card-text>
      <v-list>
        <Aesthetic
          v-for="aesthetic in currentAesthetics"
          :key="aesthetic"
          :name="aesthetic"
        />
      </v-list>
      <v-overflow-btn
        v-model="addAestheticSelected"
        :items="aesthetics"
        item-value="name"
        label="Add new aesthetic"
        flat
        filled
        hide-details
        class="pt-2"
        @input="addAesthetic"
      >
        <template #item="{ item, attrs, on }">
          <v-list-item v-bind="attrs" style="max-width: 600px;" v-on="on">
            <v-list-item-icon>
              <v-icon :color="primaryBlue" v-text="item.icon" />
            </v-list-item-icon>

            <v-list-item-content :id="attrs['aria-labelledby']">
              <span>
                <strong>{{ item.name }}</strong> - {{ item.text }}
              </span>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-overflow-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import Aesthetic from '~/components/Aesthetic'
import { aesthetics } from '~/constants/aesthetics'
import { primaryBlue } from '~/static/js/colours'

export default {
  name: 'Dataset',
  components: {
    Aesthetic,
  },
  data() {
    return { primaryBlue, addAestheticSelected: null }
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
