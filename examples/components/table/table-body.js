import mixin from './mixins';

export default{
  name: 'Tablebody',
  mixins: [mixin],
  props: {
    data: Array,
    columns: Array,
    columnsWidth: Object,
    fixed: {
      type: [Boolean, String],
      default: false
  },
  prefixCls:{
    type:String,
    default:''
  },
  },
  render(h) {
    return (<table class={this.prefixCls+'__body'}
      cellspacing="0"
      cellpadding="0"
      border="0">
      <colgroup>
        {this.columns.map(col => <col width={this.setCellWidth(col)}/>)}
      </colgroup>
      <tbody>
        {this.data.map((row, rowIndex) => <tr class={this.getTrCls(rowIndex)} onMouseenter={(event)=>{
          this.onmouseenter(row,event)
        }} onMouseleave={(event)=>{
          this.onmouseleave(row,event)
        }}>
          {
            this.columns.map(col => <td class={[this.prefixCls+'__td',this.alignCls(col)]}><div class={this.getCellCls(col)}>{this.renderCell(row, col, rowIndex)}</div></td>)
          }
        </tr>)}
      </tbody>
    </table>);
  },
  methods:{
    
    getCellCls(col){
      const prefixCls = this.prefixCls
      return [prefixCls+'__td-cell',{[prefixCls+'_cell-ellipsis']:col.ellipsis }]
    },
    getTrCls(index){
      return [this.prefixCls+'__tr']
    },
    onmouseenter(rowIndex,event){
      event.target.className = event.target.className + ' '+ this.prefixCls+'__tr-hover'
    },
    onmouseleave(rowIndex,event){
      const cls = ' '+this.prefixCls+'__tr-hover'
      event.target.className = event.target.className.replace(cls,'')
    },
    chooseRow(index){
      this.$parent.chooseRow(index)
    },
    renderCell(row, col, index) {
      if (col.type === 'index') {
        return index + 1;
      } else if (col.type === 'selection') {
        return <div onClick={()=>{this.chooseRow(index)}} name="checkbox" class={'doubledef single'+(row._isChoose ? ' doubleact':'')}></div>;
      }
      return row[col.key];
    }
  },
  computed: {

  },
};
