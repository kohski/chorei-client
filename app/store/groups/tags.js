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
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('タグが存在しません')
        }
      })
  },
  async indexTagsByGroup({ commit }, { groupId }) {
    await this.$axios.get(
      `/tags?group_id=${groupId}`,
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
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('タグが存在しません')
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
        this.$toast.success('タグが登録されました。タグはグループで共有されます。')
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('タグを登録できませんでした')
        }
      })
  },
  async postTagWithGroupId({ commit }, { name, groupId }) {
    await this.$axios.post(
      `/tags`,
      {
        tag: {
          name: name,
          group_id: groupId
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
        this.$toast.success('タグが登録されました。タグはグループで共有されます。')
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('タグを登録できませんでした')
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
        this.$toast.success('タグを削除しました')
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('タグを削除できませんでした')
        }
      })
  }
}
