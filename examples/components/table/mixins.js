export default{
  methods: {
    alignCls (column) {
      return {'my-table-hidden':this.fixed === 'left' && column.fixed!== 'left'}
         
  },
    setCellWidth(column) {
      let width = '';
      if (column.width) {
        width = column.width;
      // eslint-disable-next-line no-underscore-dangle
      } else if (this.columnsWidth[column._index]) {
        // eslint-disable-next-line no-underscore-dangle
        width = this.columnsWidth[column._index].width;
      }
      if (width === '0') width = '';
      return width;
    },
  },
};
