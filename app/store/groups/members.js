export const state = () => ({
  members: []
})

export const getters = {
  members(state) { return state.members }
}

export const mutations = {
  setMembers(state, members) {
    state.members = members
  },
  addMember(state, member) {
    state.members.push(member)
  },
  setMember(state, member) {
    state.member = member
  }
}
export const actions = {
  async indexMembers({ commit, state }, { groupId }) {
    await this.$axios.get(
      `groups/${groupId}/members`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setMembers', res.data.data)
      })
      .catch((e) => {
        commit('setMembers', [])
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  },
  async postMember({ commit, store }, { email, groupId }) {
    await this.$axios.post(
      `groups/${groupId}/members`,
      {
        member: {
          email
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
        this.$toast.success('メンバーを招待しました')
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('メンバーが存在しません')
        }
      })
  },
  async deleteMember({ commit }, { groupId, userId }) {
    await this.$axios.delete(
      `/groups/${groupId}/destroy_with_user_id_and_group_id?user_id=${userId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        if (process.client) {
          this.$toast.success('メンバーを除外しました')
        }
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async updateMember({ commit }, { memberId }) {
    await this.$axios.put(
      `/members/${memberId}`,
      {
        member: {
          is_owner: true
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
        if (process.client) {
          this.$toast.success('オーナーを変更しました')
        }
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  }
}
