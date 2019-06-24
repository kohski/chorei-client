// import Vue from 'vue'

export const state = () => ({
  jobs: [],
  job: {},
  groupId: ''
})

export const getters = {
  jobs(state) { return state.jobs },
  job(state) { return state.job },
  groupId(state) { return state.groupId }
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
  },
  setGroupId(state, groupId) {
    state.groupId = groupId
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
        const jobId = res.data.data.id
        this.$toast.success('job is successfully created')
        this.$router.push(`/jobs/${jobId}`)
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async deleteJob({ commit }, jobId) {
    await this.$axios.delete(
      `/jobs/${jobId}`,
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
  async putJob({ commit }, { jobId, formData }) {
    await this.$axios.put(
      `/jobs/${jobId}`,
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
        this.$toast.success('UpdateCompleted Completed!!')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async showJob({ commit }, { jobId }) {
    await this.$axios.get(
      `/jobs/${jobId}`,
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
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  },
  async getGroupId({ commit }, { jobId }) {
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
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  }
}
