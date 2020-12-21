import mixin from './mixins';

export default{
  name: 'Tablebody',
  mixins: [mixin],
  props: {
    data: Array,
    columns: Array,
    columnsWidth: Object,
  },
  render() {
    function renderCell(row, col, index) {
      if (col.type === 'index') {
        return index + 1;
      } else if (col.type === 'selection') {
        return '';
      }
      return row[col.key];
    }
    return (<table class="my-table__body"
      cellspacing="0"
      cellpadding="0"
      border="0">
      <colgroup>
        {this.columns.map(col => <col width={this.setCellWidth(col)}/>)}
      </colgroup>
      <tbody>
        {this.data.map((row, rowIndex) => <tr class="my-table__tr">
          {
            this.columns.map(col => <td class="my-table__td" ><div class="my-table__td-cell">{renderCell(row, col, rowIndex)}</div></td>)
          }
        </tr>)}
      </tbody>
    </table>);
  },
  computed: {

  },
};
