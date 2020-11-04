import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Aesthetics from '@/components/Aesthetics.vue'
import { defaultGeometry } from '@/store/geometries'
import { geometries } from '@/constants/geometries'
import { aesthetics } from '@/constants/aesthetics'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)

describe('Aesthetics', () => {
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
    wrapper = mount(Aesthetics, {
      store,
      localVue,
      vuetify,
    })
  })

  test('currentAesthetics returns the right aesthetics', () => {
    const testGeo = 'arc'
    store.commit('geometries/setGeometries', [defaultGeometry(testGeo)])
    store.commit('geometries/setSelectedGeometry', 0)
    const expectedAesthetics = geometries.filter((geo) => {
      return geo.name === testGeo
    })[0].defaultAesthetics
    expect(wrapper.vm.currentAesthetics).toStrictEqual(expectedAesthetics)
  })

  test('renders the right default aesthetics', async () => {
    const testGeo = 'circle'
    store.commit('geometries/setGeometries', [defaultGeometry(testGeo)])
    store.commit('geometries/setSelectedGeometry', 0)
    await Vue.nextTick()
    const expectedAesthetics = geometries.filter((geo) => {
      return geo.name === testGeo
    })[0].defaultAesthetics
    for (let i = 0; i < expectedAesthetics.length; i++) {
      expect(wrapper.text()).toContain(expectedAesthetics[i])
    }
  })

  test('add new aesthetic button lists aesthetics constant', () => {
    const button = wrapper.find('.v-overflow-btn')
    expect(button.exists()).toBe(true)
    expect(button.props('items')).toStrictEqual(aesthetics)
  })

  test('addAesthetic function adds the correct aesthetic', async () => {
    wrapper.vm.addAesthetic('x2')
    await Vue.nextTick()
    expect(wrapper.text()).toContain('x2')
  })

  test('add new aesthetic button adds the correct aesthetic', async () => {
    const button = wrapper.find('.v-overflow-btn')
    button.vm.selectItem('y2')
    await Vue.nextTick()
    expect(wrapper.text()).toContain('y2')
  })

})
