export const state = () => ({
  schedules: [],
  schedule: {}
})

export const getters = {
  schedules(state) { return state.schedules }
}

export const mutations = {
  setSchedules(state, schedules) {
    state.schedules = schedules
  },
  setSchedule(state, schedule) {
    state.schedule = schedule
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
  async putSchedule({ commit }, { scheduleId, image, memo }) {
    await this.$axios.put(
      `/schedule/${scheduleId}`,
      {
        schedule: {
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