export const state = () => ({
  groups: [],
  group: {}
})

export const getters = {
  groups(state) { return state.groups },
  group(state) { return state.group }
}

export const mutations = {
  setGroups(state, groups) {
    state.groups = groups
  },
  addGroup(state, group) {
    state.groups.push(group)
  },
  setGroup(state, group) {
    state.group = group
  }
}
export const actions = {
  async indexGroups({ commit, state }) {
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
        if (process.server) {
          return
        }
        this.$toast.error(e.response.data.message || e)
      })
  },
  async postGroup({ commit }, formData) {
    await this.$axios.post(
      `/groups`,
      {
        group: formData
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        this.$toast.success('group is successfully created')
        this.$router.push('/groups')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async deleteGroup({ commit }, payload) {
    await this.$axios.delete(
      `/groups/${payload.id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        this.$toast.success('Destroy Completed!!')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async showGroup({ commit }, { groupId }) {
    await this.$axios.get(
      `/groups/${groupId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setGroup', res.data.data)
      })
      .catch((e) => {
        if (process.server) {
          return
        }
        this.$toast.error(e.response.data.message || e)
      })
  }
}
