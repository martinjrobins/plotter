<template>
  <div ref="box">
    <div id="viz"></div>
  </div>
</template>

<script>
import embed from 'vega-embed'
import axios from 'axios'
import { uploadPlot } from '~/api/NIVS'
import { getAuthHeader } from '@/plugins/authHeader'

export default {
  props: {
    spec: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      width: 0,
    }
  },
  watch: {
    spec(v) {
      if (v) this.draw()
    },
  },
  async mounted() {
    window.addEventListener('resize', this.handleResize)
    await this.handleResize()
  },
  // bind event handlers to the `handleResize` method (defined below)
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    // whenever the document is resized, re-set the 'fullHeight' variable
    handleResize(event) {
      this.width = this.$refs.box.clientWidth
      this.draw()
    },
    draw() {
      this.spec.width = 0.7 * this.width
      this.spec.height = 0.55 * this.width

      const embedOptions = {
        actions: false,
        loader: {
          http: {
            headers: {
              Authorization: getAuthHeader(),
            },
          },
        },
      }
      return embed('#viz', this.spec, embedOptions)
        .then((res) => {
          res.finalize()
        })
        .catch((error) => {
          console.log('ERROR in vega-embed: ', error)
        })
      // this.$store.commit('setVegaView', result.view)
    },
    uploadPlot(title, description, filename) {
      this.view
        .toImageURL('png')
        .then((pngUrl) => {
          return axios.get(pngUrl, { responseType: 'blob' })
        })
        .then((response) => {
          return uploadPlot(title, description, filename, response.data)
        })
        .then((id) => {
          console.log('Successfully uploaded plot', id)
        })
        .catch((error) => {
          console.log('ERROR uploading image', error)
        })
    },
  },
}
</script>
