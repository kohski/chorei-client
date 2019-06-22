export const state = () => ({
  taggings: []
})

export const getters = {
  taggings(state) { return state.taggings }
}

export const mutations = {
  setTaggings(state, taggings) {
    state.taggings = taggings
  }
}

export const actions = {
  async indexTaggings({ commit }, { jobId }) {
    await this.$axios.get(
      `/taggings/taggings_with_job_id?job_id=${jobId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setTaggings', res.data.data)
      })
      .catch((e) => {
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  },
  async postTagging({ commit }, { jobId, tagId }) {
    await this.$axios.post(
      `/taggings`,
      {
        tagging: {
          job_id: jobId,
          tag_id: tagId
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
        this.$toast.success('tagging is successfully created')
      })
      .catch((e) => {
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  },
  async deleteTagging({ commit }, { taggingId }) {
    await this.$axios.delete(
      `/taggings/${taggingId}`,
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
