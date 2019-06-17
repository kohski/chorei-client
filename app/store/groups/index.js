export const state = () => ({
  groups: []
})

export const getters = {
  groups(state) { return state.groups }
}

export const mutations = {
  setGroups(state, groups) {
    state.groups = groups
  }
}
export const actions = {
  async groupIndex({ commit, state }) {
    await this.$axios.get(
      `/groups`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setGroups', res.data.data)
      })
      .catch((e) => {
        throw e.response.data.errors
      })
  }
}
