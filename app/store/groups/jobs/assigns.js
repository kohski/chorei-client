export const state = () => ({
  assigns: [],
  assignsByGroup: []
})

export const getters = {
  assigns(state) { return state.assigns },
  assignsByGroup(state) { return state.assignsByGroup }
}

export const mutations = {
  setAssigns(state, assigns) {
    state.assigns = assigns
  },
  addAssign(state, assign) {
    state.assigns.push(assign)
  },
  setAssign(state, assign) {
    state.assign = assign
  },
  setAssignsByGroup(state, assigns) {
    state.assignsByGroup = assigns
  }
}
export const actions = {
  async indexAssigns({ commit, state }, { jobId }) {
    await this.$axios.get(
      `/assigns/assign_member?job_id=${jobId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setAssigns', res.data.data)
      })
      .catch((e) => {
        commit('setAssigns', [])
        if (process.client) {
          // this.$toast.info(e.response.data.message || e)
          this.$toast.error('担当者がいません')
        }
      })
  },
  async indexAssignsByGroup({ commit, state }, { groupId }) {
    await this.$axios.get(
      `/assigns/assign_member_by_group?group_id=${groupId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setAssignsByGroup', res.data.data)
      })
      .catch((e) => {
        commit('setAssignsByGroup', [])
        if (process.client) {
          // this.$toast.info(e.response.data.message || e)
          this.$toast.error('担当者がいません')
        }
      })
  },

  async postAssign({ commit, store }, { userId, jobId }) {
    await this.$axios.post(
      `/assigns/assign_with_user_id`,
      {
        assign: {
          user_id: userId,
          job_id: jobId
        }
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        this.$toast.success('担当を割り当てました')
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('担当を割り当てできませんでした')
        }
      })
  },
  async deleteAssign({ commit }, { jobId, userId }) {
    await this.$axios.delete(
      `/assigns/assign_with_user_id?job_id=${jobId}&user_id=${userId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        this.$toast.success('担当を解除しました')
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('担当を解除できませんでした')
        }
      })
  }
}
