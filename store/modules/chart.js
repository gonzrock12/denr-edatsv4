const state = () => ({
  series: []
})

const getters = {
  getSeries (state) {
    return state.series
  }
}

const mutations = {
  chartSeries (state, payload) {
    state.series = payload
  }
}

const actions = {
  addSeries (context, payload) {
    context.commit('chartSeries', payload)
  }
}

const chartModule = {
  state,
  getters,
  mutations,
  actions
}

export default chartModule
