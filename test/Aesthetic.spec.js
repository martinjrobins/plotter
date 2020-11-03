import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Aesthetic from '@/components/Aesthetic.vue'

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
    wrapper = shallowMount(Aesthetic, {
      store,
      localVue,
      vuetify,
    })
  })

  test('finds the correct aesthetic', () => {
    wrapper.setProps({ name: 'y' })
    expect(wrapper.vm.aesthetic.name).toBe('y')
  })

  test('can read and write to aesmap', () => {
    expect(wrapper.vm.aesMap).toStrictEqual([])
    wrapper.vm.aesMap = [{ name: 'test' }]
    expect(wrapper.vm.aesMap).toStrictEqual([{ name: 'test' }])
  })
})
