export const state = () => ({
  tags: []
})

export const getters = {
  tags(state) { return state.tags }
}

export const mutations = {
  setTags(state, tags) {
    state.tags = tags
  },
  setTag(state, tag) {
    state.tag = tag
  }
}

export const actions = {
  async indexTags({ commit }, { jobId }) {
    await this.$axios.get(
      `/tags/tags_with_job_id?job_id=${jobId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setTags', res.data.data)
      })
      .catch((e) => {
        commit('setTags', [])
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  },
  async postTag({ commit }, { name, jobId }) {
    await this.$axios.post(
      `/tags/tags_with_job_id?job_id=${jobId}`,
      {
        tag: {
          name: name
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
        this.$toast.success('tag is successfully created')
      })
      .catch((e) => {
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  },
  async deleteTag({ commit }, { tagId }) {
    await this.$axios.delete(
      `/tags/${tagId}`,
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
