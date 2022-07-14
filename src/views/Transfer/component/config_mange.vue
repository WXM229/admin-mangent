<script>
export default {
  props: ['level'],
  render(createElement) {
    return createElement('h' + this.tagValue, this.$slots.default)
  },
  computed: {
    tagValue() {
      if (this.level <= 6) {
        return this.level
      } else {
        return 1
      }
    }
  }
};
</script>

<style>
</style>