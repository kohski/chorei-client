export const state = () => ({
  tags: [],
  tag: {}
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
      `jobs/${jobId}/tags`,
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
        if (process.server) {
          return
        }
        this.$toast.error(e.response.data.message || e)
      })
  },
  async postTag({ commit }, { jobId, memo, image }) {
    await this.$axios.post(
      `jobs/${jobId}/tags`,
      {
        tags: {
          memo: memo,
          image: image
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
        this.$toast.error(e.response.data.message || e)
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
  },
  async putTag({ commit }, { tagId, image, memo }) {
    await this.$axios.put(
      `/tags/${tagId}`,
      {
        tag: {
          memo: memo,
          image: image
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
        this.$toast.success('Successfully Updated!!')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  }
}
