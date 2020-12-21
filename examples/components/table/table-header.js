import mixin from './mixins';

export default{
  name: 'TableHeader',
  mixins: [mixin],
  props: {
    columns: Array,
    columnsWidth: Object,
  },
  render() {
    return (<table class="my-table__header"
      cellspacing="0"
      cellpadding="0"
      border="0">
      <colgroup>
        {this.columns.map(col => <col width={this.setCellWidth(col)}/>)}
      </colgroup>
      <thead>
        {this.headRows.map(row => <tr class="my-table__header_tr">
          {
            row.map(col => <th class="my-table__header_th"><div class="my-table__header_th-cell">{col.title}</div></th>)
          }
        </tr>)}
      </thead>
    </table>);
  },
  computed: {
    headRows() {
      return [this.columns];
    },
  },
};
