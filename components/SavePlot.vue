<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        Save Plot
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Save Plot
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="title" label="Title" />
        <v-text-field v-model="description" label="Description" />
        <v-text-field v-model="filename" label="Filename" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="save">
          Save
        </v-btn>
        <v-btn color="primary" text @click="cancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SavePlot',
  props: {
    vegaEmbedRef: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: false,
      title: null,
      description: null,
      filename: 'plot.png',
    }
  },
  methods: {
    save(event) {
      this.vegaEmbedRef.uploadPlot(this.title, this.description, this.filename)
      this.dialog = false
    },
    cancel(event) {
      this.dialog = false
    },
  },
}
</script>
