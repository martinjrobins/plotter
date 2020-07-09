import { geometryNames } from '~/constants/geometries'

export const state = () => ({
  geometries: [],
})

export const mutations = {
  addGeometry(state) {
    const newGeometry = {
      type: geometryNames[0],
      aesthetics: null,
    }
    state.geometries.push(newGeometry)
  },
  setGeometries(state, value) {
    state.geometries = value
  },
  setGeometryType(state, [index, value]) {
    state.geometries[index].type = value
  },
}
