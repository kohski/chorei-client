// import Vue from 'vue'

export const state = () => ({
  jobs: [],
  job: {}
})

export const getters = {
  jobs(state) { return state.jobs },
  job(state) { return state.job }
}

export const mutations = {
  setJobs(state, jobs) {
    state.jobs = jobs
  },
  addJob(state, job) {
    state.jobs.push(job)
  },
  setJob(state, job) {
    state.job = job
  }
}
export const actions = {
  async indexJobs({ commit, state }, { groupId }) {
    await this.$axios.get(
      `groups/${groupId}/jobs`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setJobs', res.data.data)
      })
      .catch((e) => {
        commit('setJobs', [])
        if (process.server) {
          return
        }
        this.$toast.error(e.response.data.message || e)
      })
  },
  async postJob({ commit }, { groupId, formData }) {
    await this.$axios.post(
      `groups/${groupId}/jobs`,
      {
        job: formData
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        this.$toast.success('job is successfully created')
        this.$router.push('/jobs')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async deleteJob({ commit }, id) {
    await this.$axios.delete(
      `/jobs/${id}`,
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
  async showJob({ commit }, payload) {
    await this.$axios.get(
      `/jobs/${payload.id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setJob', res.data.data)
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  }
}