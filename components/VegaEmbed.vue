<template>
  <div ref="box">
    <div id="viz"></div>
  </div>
</template>

<script>
import embed from 'vega-embed'

export default {
  props: {
    spec: Object,
  },
  async mounted() {
    window.addEventListener('resize', this.handleResize)
    await this.handleResize()
  },
  data() {
    return {
      width: 0,
    }
  },
  // bind event handlers to the `handleResize` method (defined below)
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    spec(v) {
      if (v) this.draw()
    },
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
