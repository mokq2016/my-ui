import mixin from './mixins';

export default{
  name: 'TableHeader',
  mixins: [mixin],
  props: {
    columns: Array,
    columnsWidth: Object,
    prefixCls:{
      type:String,
      default:''
    },
    fixed: {
      type: [Boolean, String],
      default: false
  },
  },
  render(h) {
    return (<table class={this.prefixCls+'__header'}
      cellspacing="0"
      cellpadding="0"
      border="0">
      <colgroup>
        {this.columns.map(col => <col width={this.setCellWidth(col)}/>)}
      </colgroup>
      <thead>
        {this.headRows.map(row => <tr class={this.prefixCls+'__header_tr'} >
          {
            row.map(col => <th class={[this.prefixCls+'__header_th',this.alignCls(col)]}><div class={this.prefixCls+'__header_th-cell'}>{col.title}</div></th>)
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
