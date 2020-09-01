<template>
  <div ref="box">
    <div id="viz"></div>
  </div>
</template>

<script>
import embed from 'vega-embed'

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
    async handleResize(event) {
      this.width = this.$refs.box.clientWidth
      await this.draw()
    },
    async draw() {
      this.spec.width = 0.9 * this.width
      this.spec.height = 0.65 * this.width
      await embed('#viz', this.spec, { actions: false })
    },
  },
}
</script>
