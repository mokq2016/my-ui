<template>
  <div>
    <my-table :columns="columns" :data="tableData"/>
  </div>
</template>

<script>
import myTable from '../components/table/table';

export default {
  name: 'button',
  components: { myTable },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      columns: [{
        title: '序号',
        type: 'index',
      }, {
        title: 'ID',
        key: 'id',
        width: '520',
      },
      {
        title: 'Name',
        key: 'name',
        width: '320',
      },
      {
        title: 'Amount1',
        key: 'amount1',
        width: '320',
      },
      {
        title: 'Amount2',
        key: 'amount2',
        width: '320',
      },
      {
        title: 'Amount3',
        key: 'amount3',
        width: '320',
      }, {
        title: 'Amount3',
        key: 'amount3',
        width: '320',
      }],
      tableData: [{
        id: '100001',
        name: 'John Brown',
        amount1: '123',
        amount2: '1.2',
        amount3: 10,
      }, {
        id: '100002',
        name: 'Jim Green',
        amount1: '234',
        amount2: '2.3',
        amount3: 11,
      }, {
        id: '100003',
        name: 'Joe Black',
        amount1: '345',
        amount2: '3.4',
        amount3: 12,
      }, {
        id: '100004',
        name: 'Jon Snow',
        amount1: '456',
        amount2: '4.5',
        amount3: 13,
      }, {
        id: '100005',
        name: 'Jobs',
        amount1: '678',
        amount2: '5.6',
        amount3: 14,
      }],
    };
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

