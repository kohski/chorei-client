export const state = () => ({
  assigns: []
})

export const getters = {
  assigns(state) { return state.assigns }
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
        if (process.client) {
          this.$toast.info(e.response.data.message || e)
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
        this.$toast.success('assign is successfully created')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
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
        this.$toast.success('Destroy Completed!!')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  }
}
