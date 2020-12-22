<template>
  <div class="my-table">
    <div class="my-table__header-wrapper" ref="header">
      <table-header :columns="columnsClone" :columnsWidth="columnsWidth"/>
    </div>
    <div class="my-table__body-wrapper" @scroll="handleBodyScroll">
      <table-body :data="data" :columns="columnsClone" :columnsWidth="columnsWidth"/>
    </div>
    <div class="my-table-fixed">
      <div class="my-table__header-wrapper">
      <table-header :columns="columnsClone" :columnsWidth="columnsWidth" fixed="left"/>
    </div>
    <div class="my-table__body-wrapper" @scroll="handleBodyScroll">
      <table-body :data="data" :columns="columnsClone" :columnsWidth="columnsWidth" fixed="left"/>
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
        if (col.type === 'index') {
          columnsWidth[index] = { width: 80 };
          return;
        }
        columnsWidth[index] = { width: tableWidth / this.columns.length };
      });
      this.columnsWidth = columnsWidth;
    },
    handleBodyScroll(event){

      this.$refs.header.scrollLeft = event.target.scrollLeft
      console.log(event.target.scrollLeft)
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
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="less">
.my-table{
  width: 100%;
}
@import url('./index.less');
</style>

