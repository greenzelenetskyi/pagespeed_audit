export const state = () => ({
  data: []
})

export const mutations = {
  fetchData: function(state, result) {
    state.data = result
  }
}
