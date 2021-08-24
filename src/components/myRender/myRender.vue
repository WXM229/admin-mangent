<script>
export default {
  functional: true,
  props: ['row', 'render'],
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
    };
    return ctx.props.render(h, params);
  }
}
</script>
