import { geometryNames } from '~/constants/geometries'
import { aestheticsNames } from '~/constants/aesthetics'

function defaultGeometry() {
  return {
    type: geometryNames[0],
    aesthetics: aestheticsNames.reduce((map, aes) => {
      map[aes] = []
      return map
    }, {}),
  }
}

export const state = () => ({
  selectedGeometry: 0,
  geometries: [defaultGeometry()],
})

export const mutations = {
  addGeometry(state) {
    const newGeometry = defaultGeometry()
    state.geometries.push(newGeometry)
    state.selectedGeometry = state.geometries.length - 1
  },
  setGeometries(state, value) {
    state.geometries = value
  },
  setGeometryType(state, [index, value]) {
    state.geometries[index].type = value
  },
  updateAesthetics(state, [name, value]) {
    const aes = state.geometries[state.selectedGeometry].aesthetics
    const oldValue = aes[name]
    const diff = value.filter((x) => !oldValue.includes(x))
    aes[name] = diff
  },
  setAesthetics(state, value) {
    state.aestheticsMap = value
  },
  setAestheticColumnProperty(state, [aesthetic, index, prop, value]) {
    const aes = state.geometries[state.selectedGeometry].aesthetics
    aes[aesthetic][index][prop] = value
  },
  setSelectedGeometry(state, index) {
    console.log('set selected geometry', index)
    state.selectedGeometry = index
  },
}

export const getters = {
  geometry(state) {
    return state.geometries[state.selectedGeometry]
  },
}
