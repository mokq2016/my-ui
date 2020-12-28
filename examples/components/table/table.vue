<template>
  <div class="my-table">
    <div class="my-table__header-wrapper" ref="header">
      <table-header :prefixCls="'my-table'" :columns="columnsClone" :columnsWidth="columnsWidth"/>
    </div>
    <div class="my-table__body-wrapper" @scroll="handleBodyScroll" ref="tableBodyWrap">
      <table-body :prefixCls="'my-table'" :data="data" :columns="columnsClone" :columnsWidth="columnsWidth"/>
    </div>
    <div ref="leftFixTable" class="my-table-fixed" v-if="isLeftFixed" :style="getLeftTabelStyle">
      <div class="my-table-fixed__header-wrapper">
        <table-header :prefixCls="'my-table-fixed'" :columns="columnsClone" :columnsWidth="columnsWidth" fixed="left"/>
      </div>
      <div class="my-table-fixed__body-wrapper" @scroll="handleBodyScroll">
        <table-body :prefixCls="'my-table-fixed'" :data="data" :columns="columnsClone" :columnsWidth="columnsWidth" fixed="left"/>
      </div>
    </div>
    <div ref="rightFixTable" class="my-table-fixed_right" v-if="isRightFixed" :style="getRightTabelStyle">
      <div class="my-table-fixed_right__header-wrapper">
        <table-header :prefixCls="'my-table-fixed_right'" :columns="fixedRightColumns" :columnsWidth="columnsWidthFixRight" fixed="right" :style="getRightTabelStyle"/>
      </div>
      <div class="my-table-fixed_right__body-wrapper" @scroll="handleBodyScroll">
        <table-body :prefixCls="'my-table-fixed_right'" :data="data" :columns="fixedRightColumns" :columnsWidth="columnsWidthFixRight" fixed="right" :style="getRightTabelStyle"/>
      </div>
    </div>
  </div>
</template>

<script>
import tableHeader from './table-header';
import tableBody from './table-body';

export default {
  name: 'table',
  components: {
    tableHeader,
    tableBody,
  },
  props: {
    columns: Array,
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      columnsWidth: {},
    };
  },
  methods: {
    handleResize() {
      const tableWidth = this.$el.offsetWidth - 1;
      const columnsWidth = {};
      this.columns.forEach((col, index) => {
        if (col.type === 'selection') {
          columnsWidth[index] = { width: col.width || 40 };
          return;
        }
        if (col.type === 'index') {
          columnsWidth[index] = { width: col.width || 60 };
          return;
        }
        columnsWidth[index] = { width: tableWidth / this.columns.length };
      });
      this.columnsWidth = columnsWidth;
    },
    handleBodyScroll(event){
      const target = event.target
      this.$refs.header.scrollLeft = event.target.scrollLeft
      if(this.$refs.header.scrollLeft){
        this.$refs.leftFixTable.style.boxShadow = '1px -2px 7px rgba(0,0,0,0.3)'
      }else{
        this.$refs.leftFixTable.style.boxShadow = 'none'
      }
      if(target.scrollLeft + target.clientWidth >= target.scrollWidth){
        this.$refs.rightFixTable.style.boxShadow = 'none'
      }else{ 
        this.$refs.rightFixTable.style.boxShadow = '1px -2px 7px rgba(0,0,0,0.3)'
      }
    },
    chooseRow(rowIndex){
      // this.data = this.data.map((item,index)=>{
      //   if(rowIndex === index){
      //     return {
      //       ...item,
      //       _isChoose:!item._isChoose
      //     }
      //   }else{
      //     return {
      //       ...item
      //     }
      //   }
      // })
      const row = this.data[rowIndex]
      row._isChoose = !row._isChoose
      this.data.splice(rowIndex,1,row)
    }
  },
  watch: {
    columns: {
      handler() {
        this.handleResize();
      },
      deep: true,
    },
  },
  computed: {
    columnsClone() {
      return this.columns.map((col, index) => ({ ...col, _index: index }));
    },
    fixedRightColumns(){
      let list = [];
      let other = [];
      this.columns.forEach((col) => {
          if (col.fixed && col.fixed === 'right') {
              list.push(col);
          } else {
              other.push(col);
          }
      });
      return list.concat(other).map((col, index) => ({ ...col, _index: index }));
    },
    columnsWidthFixRight(){
      const columnsWidth = {}
      this.fixedRightColumns.forEach((col,index)=>{
        columnsWidth[index] = {width:col.width || 180}
      })
      return columnsWidth
    },
    isLeftFixed(){
      return this.columns.some(col => col.fixed && col.fixed === 'left');
    },
    isRightFixed () {
        return this.columns.some(col => col.fixed && col.fixed === 'right');
    },
    getLeftTabelStyle(){
      let width = 0
      for (const key in this.columnsWidth) {
        if(this.columns[key]['fixed'] === 'left'){
          width += parseInt(this.columnsWidth[key]['width'])
        }
      }
      return {
        width:width + 'px'
      }
    },
    getRightTabelStyle(){
      let width = 0
      for (const key in this.columnsWidthFixRight) {
        if(this.fixedRightColumns[key]['fixed'] === 'right'){
          width += parseInt(this.columnsWidthFixRight[key]['width'])
        }
      }
      return {
        width:width + 'px'
      }
    }
  },
  mounted() {
    if(this.$attrs['max-height']){
      this.$refs.tableBodyWrap.style['maxHeight'] = this.$attrs['max-height'] + 'px'
    }
    
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="scss">
// @import url('./index.scss');

%my-table__header_th {
    padding: 8px 0;
    text-align: left;
    color: #333;
    font-weight: bolder;
    font-size: 12px;
    background-color: #f1f2f3;
    border-bottom: 1px solid #e8eaec;
}
%my-table__td{
  text-align: left;
    padding: 12px 0;
    border-bottom: 1px solid #e8eaec;
    background: #fff;
    font-size:12px;
}
%my-table__td-cell{
      padding: 0 10px;
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: break-all;
}
%my-table__header{
  table-layout: fixed;
  border-collapse: separate;
  width: 100%;
}
%my-table__body{
  table-layout: fixed;
    border-collapse: separate;
    width: 100%;
    overflow-y:auto
}
.my-table{
  overflow: hidden;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  &-hidden{
    visibility: hidden;
    background: transparent!important;
    // display: none;
  }
  &__tr-hover{
    .my-table__td{
      background: #f9f9f9!important;
    }
  }
  
  .my-table-fixed{
    position: absolute;
    top: 0;
    left: 0;
    .my-table-fixed__header-wrapper{
      overflow: hidden;
    }
    .my-table-fixed__body-wrapper{
      overflow: hidden;
      // position: absolute;
      // top: 33px;
      // left: 0;
      // background: #fff;
    }
    &_cell-ellipsis{
      white-space: nowrap;
    }
    &__header-wrapper{
      overflow: hidden;
    }
    &__body-wrapper{
      overflow: auto;
    }
    &__header{
  @extend %my-table__header;
  
}
    &__body{
       @extend %my-table__body;
    }
    &__header_th{
      @extend %my-table__header_th;
      &-cell{
      padding:0 10px;
    }
    }
    &__td{
      @extend %my-table__td;
      &-cell{
        @extend %my-table__td-cell;
      }
    }  
  }
  .my-table-fixed_right{
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: 1px -2px 7px rgba(0,0,0,0.3);
    .my-table-fixed_right__header-wrapper{
      // position: absolute;
      // top: 0;
      // right: 0;
      overflow: hidden;
    }
    .my-table-fixed_right__body-wrapper{
      // position: absolute;
      // top: 33px;
      // right: 0;
      overflow: hidden;
      // background: #fff;
    }
    &_cell-ellipsis{
      white-space: nowrap;
    }
    &__header-wrapper{
      overflow: hidden;
    }
    &__body-wrapper{
      overflow: auto;
    }
    &__header{
  @extend %my-table__header;
  
}
    &__body{
       @extend %my-table__body;
    }
    &__header_th{
      @extend %my-table__header_th;
      &-cell{
      padding:0 10px;
    }
    }
    &__td{
      @extend %my-table__td;
      &-cell{
        @extend %my-table__td-cell;
      }
    }  
  }
&__header{
  @extend %my-table__header;
  
}
.my-table__header_th{
    @extend %my-table__header_th;
    &-cell{
      padding:0 10px;
      
    }
  }
&__header-wrapper{
  overflow: hidden;
}
&__body-wrapper{
  overflow: auto;
}
  .my-table__body{
    @extend %my-table__body;
  }
  .my-table__td{
    @extend %my-table__td;
    &-cell{
     @extend %my-table__td-cell;
    }
    .my-table_cell-ellipsis{
      white-space: nowrap;
    }
  }
}
</style>

