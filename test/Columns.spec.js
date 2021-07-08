import { createLocalVue, mount } from '@vue/test-utils'
import Columns from '@/components/Columns.vue'
import { defaultColumn } from '@/store/dataset'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('Columns', () => {
  let NuxtStore
  let store
  let vuetify
  let wrapper

  beforeAll(async () => {
    // note the store will mutate across tests
    const storePath = `${process.env.buildDir}/store.js`
    NuxtStore = await import(storePath)
  })

  beforeEach(async () => {
    store = await NuxtStore.createStore()
    const defaultProps = defaultColumn()
    defaultProps.type = 'quantitative'
    store.commit('dataset/setColumns', [{ name: 'col1', ...defaultProps }])
    store.commit('dataset/setColumnsInDatafile', [
      { name: 'col1', ...defaultProps },
      { name: 'col2', ...defaultProps },
      { name: 'col3', ...defaultProps },
    ])
    vuetify = new Vuetify()
    wrapper = mount(Columns, {
      store,
      localVue,
      vuetify,
    })
  })

  test('columnsInDataFile returns a list of all column names', () => {
    expect(wrapper.vm.columnsInDataFile).toStrictEqual(['col1', 'col2', 'col3'])
  })

  test('columns returns a list of selected column names', () => {
    expect(wrapper.vm.columns).toHaveLength(1)
    expect(wrapper.vm.columns[0].name).toStrictEqual('col1')
  })

  test('can set columns', () => {
    const defaultProps = defaultColumn()
    const newColumns = [
      { name: 'test1', ...defaultProps },
      { name: 'test2', ...defaultProps },
    ]
    wrapper.vm.columns = newColumns
    expect(wrapper.vm.columns).toStrictEqual(newColumns)
  })

  test('filterExpression get/set', () => {
    wrapper.vm.filterExpression = 'test'
    expect(wrapper.vm.filterExpression).toStrictEqual('test')
  })

  test('addColumn adds a column from those in data file', () => {
    wrapper.vm.addColumn('col3')
    expect(wrapper.vm.columns).toHaveLength(2)
    expect(wrapper.vm.columns[1].name).toStrictEqual('col3')
  })

  test('addColumn throws if you try to add a col not in data file', () => {
    expect(() => {
      wrapper.vm.addColumn('not_exist')
    }).toThrow()
  })

  test('addCalculateField adds a new column with correct options', () => {
    const expr = '2*datum.col1'
    wrapper.vm.calculateExpression = expr
    wrapper.vm.addCalculateField()
    expect(wrapper.vm.columns).toHaveLength(2)
    expect(wrapper.vm.columns[1].name).toStrictEqual(expr)
    expect(wrapper.vm.columns[1].calculate).toStrictEqual(expr)
  })
})
