export const state = () => ({
  schedules: [],
  schedule: {},
  assignedSchedules: [],
  groupSchedules: []
})

export const getters = {
  schedules(state) { return state.schedules },
  assignedSchedules(state) { return state.assignedSchedules },
  groupSchedules(state) { return state.groupSchedules }
}

export const mutations = {
  setSchedules(state, schedules) {
    state.schedules = schedules
  },
  setSchedule(state, schedule) {
    state.schedule = schedule
  },
  setAssignedSchedules(state, assignedSchedules) {
    state.assignedSchedules = assignedSchedules
  },
  setGroupSchedules(state, groupSchedules) {
    state.groupSchedules = groupSchedules
  }
}

export const actions = {
  async indexSchedules({ commit }, { jobId }) {
    await this.$axios.get(
      `jobs/${jobId}/schedules`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setSchedules', res.data.data)
      })
      .catch((e) => {
        commit('setSchedules', [])
        if (process.server) {
          return
        }
        this.$toast.error(e.response.data.message || e)
      })
  },
  async postSchedule({ commit }, { jobId, memo, image }) {
    await this.$axios.post(
      `jobs/${jobId}/schedules`,
      {
        schedules: {
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
        this.$toast.success('schedule is successfully created')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async deleteSchedule({ commit }, { scheduleId }) {
    await this.$axios.delete(
      `/schedule/${scheduleId}`,
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
  async putSchedule({ commit }, { scheduleId, isDone }) {
    await this.$axios.put(
      `/schedules/${scheduleId}`,
      {
        schedule: {
          is_done: isDone
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
        this.$toast.success('更新が完了しました')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async indexAssignedSchedules({ commit }) {
    await this.$axios.get(
      `/assigned_schedules`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        commit('setAssignedSchedules', res.data.data)
      })
      .catch((e) => {
        commit('setAssignedSchedules', [])
        if (process.client) {
          this.$toast.error('スケジュールを取得できませんでした')
        }
      })
  },
  async indexGroupSchedules({ commit }, { groupId }) {
    await this.$axios.get(
      `/group_schedules?group_id=${groupId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        commit('setGroupSchedules', res.data.data)
      })
      .catch((e) => {
        commit('setGroupSchedules', [])
        if (process.client) {
          this.$toast.error('スケジュールを取得できませんでした')
        }
      })
  }
}
