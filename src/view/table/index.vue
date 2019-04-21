<style lang="less">
@import "./index.less";
</style>
<template>
  <div>
    <Card class="search-con" shadow>
      <Input clearable :placeholder="$t('powerstation_name')" class="search-input" v-model="searchValue"/>
      <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="ios-search-outline" /> {{ $t('search') }}</Button>
    </Card>
    <Button type="primary" icon="ios-add-circle-outline" style="margin-bottom: 18px" @click="showCreateForm">{{ $t('create') }}</Button>
    <Table
      :border="false"
      :stripe="true"
      :show-header="true"
      :data="tableData"
      :loading="loading"
      :columns="columns"
      size="small"
      :height="tableHeight"
      :highlight-row="true"
      editable
      @on-sort-change="handleSortChange"
    ></Table>
    <div class="page">
      <Page :total="total" :current="current" :page-size="size" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer show-total show-elevator></Page>
    </div>
    <Modal
      v-model="detailModel"
      :title="$t('detail')"
      @on-ok="detailModelOkHandle"
      scrollable
      width="620"
      mask
      :mask-closable="false">
      <p>{{ $t('powerstation_name') }}: {{formObj.organizeName}}</p>
    </Modal>
    <Modal
      v-model="baseFormModel"
      :title="formObj.organizeId === '' ? $t('create') : $t('update')"
      scrollable
      width="620"
      mask
      :mask-closable="false"
      :closable="false">
      <Form :model="formObj" :label-width="80" :rules="ruleValidate" ref="baseForm">
        <FormItem :label="$t('organize_name')" prop="organizeName">
            <Input v-model="formObj.organizeName" :placeholder="$t('please_input')+$t('organize_name')"/>
        </FormItem>
      </Form>
      <Spin size="large" fix v-if="submiting"></Spin>
      <div slot="footer">
        <Button type="text" @click="closeBaseFormHandle">{{ $t('i.modal.cancelText') }}</Button>
        <Button type="primary" @click="submitBaseFormHandle">{{ $t('i.modal.okText') }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// import { loadOrganizes, deleteOrganize, upinsertOrganize } from '@/api/organize'
export default {
  data () {
    return {
      tableData: [],
      tableHeight: 100,
      total: 0,
      size: 10,
      loading: false,
      submiting: false,
      formObj: {
        organizeId: '',
        organizeName: ''
      },
      baseFormModel: false,
      detailModel: false,
      deleting: false,
      current: 1,
      searchValue: '',
      orderField: '',
      orderType: ''
    }
  },
  computed: {
    columns () {
      return [{
        type: 'index',
        width: 60,
        align: 'center'
      },
      {
        title: this.$t('record_id'),
        key: 'organizeId',
        sortable: 'custom',
        width: 100,
        tooltip: true
      },
      {
        title: this.$t('powerstation_name'),
        key: 'organizeName',
        sortable: 'custom',
        width: 200,
        tooltip: true
      },
      {
        title: this.$t('create_at'),
        sortable: 'custom',
        width: 210,
        key: 'createAt'
      },
      {
        title: this.$t('update_at'),
        sortable: 'custom',
        width: 210,
        key: 'updateAt'
      },
      {
        title: this.$t('action'),
        key: 'action',
        width: 240,
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'text',
                size: 'small',
                icon: 'ios-paper-outline'
              },
              on: {
                'click': () => {
                  this.showDetailModel(params)
                }
              }
            }, this.$t('detail')),
            h('Button', {
              props: {
                type: 'text',
                size: 'small',
                icon: 'ios-create-outline'
              },
              on: {
                'click': () => {
                  this.showEditForm(params)
                }
              }
            }, this.$t('edit')),
            h('Poptip', {
              props: {
                confirm: true,
                title: this.$t('table_handle_delete_tip')
              },
              on: {
                'on-ok': () => {
                  this.handleDelete(params)
                }
              }
            }, [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small',
                  icon: 'ios-trash-outline',
                  loading: this.deleting
                }
              }, this.$t('delete'))
            ])
          ])
        }
      }]
    },
    ruleValidate () {
      return {
        organizeName: [{
          required: true,
          message: this.$t('please_input') + this.$t('powerstation_name'),
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    load () {
      // this.loading = true
      // let searchValue = this.searchValue
      // let size = this.size
      // let page = this.current
      // let orderField = this.orderField
      // let orderType = this.orderType
      const _this = this
      _this.tableData = [{
        organizeId: '1',
        organizeName: '测试',
        createAt: '2018-12-24 12:24:00',
        updateAt: '2018-12-24 12:25:00'
      }]
      _this.current = 1
      _this.total = 1
      _this.size = 10
    },
    handleDelete (params) {
      const _this = this
      _this.deleting = true
    },
    handleSearch (e) {
      this.load()
    },
    changePage (page) {
      this.current = page
      this.load()
    },
    changePageSize (size) {
      this.size = size
      this.load()
    },
    handleSortChange (e) {
      this.orderField = e.key
      this.orderType = e.order
      this.load()
    },
    showCreateForm () {
      this.formObj.organizeId = ''
      this.formObj.organizeName = ''
      this.baseFormModel = true
    },
    showEditForm (params) {
      this.formObj.organizeId = params.row.organizeId
      this.formObj.organizeName = params.row.organizeName
      this.baseFormModel = true
    },
    submitBaseFormHandle () {
      const _this = this
      _this.$refs['baseForm'].validate((valid) => {
        if (valid) {
          _this.submiting = true
        }
      })
    },
    closeBaseFormHandle () {
      this.formObj.organizeId = ''
      this.formObj.organizeName = ''
      this.baseFormModel = false
    },
    showDetailModel (params) {
      this.detailModel = true
      this.formObj.organizeName = params.row.organizeName
    },
    detailModelOkHandle () {
      this.detailModel = false
    }
  },
  mounted () {
    const _this = this
    _this.tableHeight = window.document.body.offsetHeight - 350
    var ctimer = false
    window.addEventListener('resize', () => {
      if (ctimer) {
        window.clearTimeout(ctimer)
      }
      ctimer = window.setTimeout(() => {
        _this.tableHeight = window.document.body.offsetHeight - 350
      }, 100)
    })
    _this.load()
  }
}
</script>
