<template>
  <div style="border: 1px solid #e0e0e0;">
    <v-row align="center">
      <v-col cols="auto">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon
                :color="primaryBlue"
                class="pl-2"
                v-text="aesthetic.icon"
              />
              {{ name }}
            </span>
          </template>
          <span>{{ aesthetic.text }}</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <draggable
          v-model="aesMap"
          :group="{ name: 'aesthetics', put: true }"
          :sort="true"
          tag="v-expansion-panels"
          :component-data="getComponentData()"
        >
          <Column
            v-for="(column, i) in aesMap"
            :key="column.name"
            :name="column.name"
            :index="i"
            :aesthetic="name"
            type="aesthetic"
          />
          <v-card-text v-if="aesMap.length == 0" slot="footer" class="c-grey">
            Add
          </v-card-text>
        </draggable>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { aesthetics } from '~/constants/aesthetics'
import Column from './Column'
import draggable from 'vuedraggable'
import { primaryBlue } from '~/static/js/colours'

export default {
  name: 'Aesthetic',
  components: {
    draggable,
    Column,
  },
  props: {
    name: {
      type: String,
      default: 'x',
    },
  },
  data() {
    return { primaryBlue }
  },
  computed: {
    aesthetics() {
      return aesthetics
    },
    aesthetic() {
      return aesthetics.filter((x) => {
        return x.name === this.name
      })[0]
    },
    aesMap: {
      get() {
        const geometry = this.$store.getters['geometries/geometry']
        return geometry.aesthetics[this.name]
      },
      set(value) {
        this.$store.commit('geometries/updateAesthetics', [this.name, value])
      },
    },
  },
  methods: {
    getComponentData() {
      return {
        attrs: {
          flat: true,
          hover: true,
        },
      }
    },
  },
}
</script>
