import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Column from '@/components/Column.vue'
import Option from '@/components/Option.vue'
import { columnProperties } from '~/constants/aesthetics'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('Aesthetic', () => {
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
    vuetify = new Vuetify()
    wrapper = shallowMount(Column, {
      store,
      localVue,
      vuetify,
    })
  })

  test('displays the column name', async () => {
    wrapper.setProps({ name: 'test' })
    await Vue.nextTick()
    expect(wrapper.text()).toContain('test')
  })

  test('renders right number of Options', () => {
    expect(wrapper.findAll('option').length).toBe(columnProperties.length)
  })

  test('columnProperties is correct', () => {
    expect(wrapper.vm.columnProperties).toStrictEqual(columnProperties)
  })

})
