export const state = () => ({
  groups: [],
  group: {},
  groupId: ''
})

export const getters = {
  groups(state) { return state.groups },
  group(state) { return state.group },
  groupId(state) { return state.groupId }
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
  },
  setGroupId(state, groupId) {
    state.groupId = groupId
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
        commit('setGroups', [])
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          // this.$toast.error('参加中のグループはありません')
        }
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
        this.$toast.success('グループが作成されました')
        this.$router.push('/mypage')
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('登録が行われませんでした')
        }
      })
  },
  async deleteGroup({ commit }, { groupId }) {
    await this.$axios.delete(
      `/groups/${groupId}`,
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
        commit('setGroup', {})
        if (process.server) {
          return
        }
        this.$toast.error(e.response.data.message || e)
      })
  },
  async putGroup({ commit }, { groupId, formData }) {
    await this.$axios.put(
      `/groups/${groupId}`,
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
        commit('setGroup', res.data.data)
        if (process.client) {
          this.$toast.info('Group is Updated!!')
        }
      })
      .catch((e) => {
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  },
  async getGroupIdWithJobId({ commit }, { jobId }) {
    await this.$axios.get(
      `/groups/group_id_with_job_id?job_id=${jobId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setGroupId', res.data.data)
      })
      .catch((e) => {
        commit('setGroupId', '')
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  }
}
