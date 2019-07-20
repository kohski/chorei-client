// import Vue from 'vue'

export const state = () => ({
  jobs: [],
  job: {},
  groupId: '',
  publicJobs: [],
  assignedJobs: []
})

export const getters = {
  jobs(state) { return state.jobs },
  job(state) { return state.job },
  groupId(state) { return state.groupId },
  publicJobs(state) { return state.publicJobs },
  assignedJobs(state) { return state.assignedJobs }
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
  },
  setPublicJobs(state, publicJobs) {
    state.publicJobs = publicJobs
  },
  setAssignedJobs(state, assignedJobs) {
    state.assignedJobs = assignedJobs
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
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('ジョブがありません')
        }
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
        // const jobId = res.data.data.id
        commit('setJob', res.data.data)
        this.$toast.success('ジョブが作成されました')
        this.$router.push(`/jobs/${res.data.data.id}`)
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('登録情報が正しくありません')
        }
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
        this.$toast.success('ジョブを削除しました')
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
        this.$toast.success('ジョブが更新されました')
      })
      .catch((e) => {
        if (process.client) {
          // this.$toast.error(e.response.data.message || e)
          this.$toast.error('ジョブが更新されませんでした')
        }
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
        commit('setJob', {})
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
  },
  async indexPublicJobs({ commit }) {
    await this.$axios.get(
      `/public_jobs`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setPublicJobs', res.data.data)
      })
      .catch((e) => {
        commit('setPublicJobs', [])
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  },
  async assignedJobs({ commit, state }, { groupId }) {
    await this.$axios.get(
      `/assigned_jobs`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setAssignedJobs', res.data.data)
      })
      .catch((e) => {
        commit('setAssignedJobs', [])
        if (process.client) {
          this.$toast.error(e.response.data.message || e)
        }
      })
  }
}
