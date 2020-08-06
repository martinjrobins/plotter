import { geometries } from '~/constants/geometries'

function defaultGeometry(name = 'line') {
  return {
    type: name,
    aesthetics: geometries[name].defaultAesthetics.reduce((map, aes) => {
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
  addGeometry(state, name) {
    const newGeometry = defaultGeometry(name)
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
    // should just be one column in aesthetic now
    const column = diff[0]
    // make sure this is copied
    aes[name] = [{ ...column }]
  },
  setAesthetics(state, value) {
    state.aesthetics = value
  },
  addAesthetic(state, value) {
    const geometry = state.geometries[state.selectedGeometry]
    geometry.aesthetics[value] = []
    geometry.aesthetics = { ...geometry.aesthetics }
  },
  setAestheticColumnProperty(state, [aesthetic, index, prop, value]) {
    const aes = state.geometries[state.selectedGeometry].aesthetics
    aes[aesthetic][index][prop] = value
  },
  setSelectedGeometry(state, index) {
    state.selectedGeometry = index
  },
}

export const getters = {
  geometry(state) {
    return state.geometries[state.selectedGeometry]
  },
}
