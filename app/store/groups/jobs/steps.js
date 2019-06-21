export const state = () => ({
  steps: [],
  step: {}
})

export const getters = {
  steps(state) { return state.steps },
  step(state) { return state.step }
}

export const mutations = {
  setSteps(state, steps) {
    const sortedSteps = steps.sort((a, b) => {
      if (a.order > b.order) {
        return 1
      }
      if (a.order < b.order) {
        return -1
      }
    })
    state.steps = sortedSteps
  },
  setStep(state, step) {
    state.step = step
  }
}

export const actions = {
  async indexSteps({ commit }, { jobId }) {
    await this.$axios.get(
      `jobs/${jobId}/steps`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        commit('setSteps', res.data.data)
      })
      .catch((e) => {
        commit('setSteps', [])
        if (process.client) {
          this.$toast.info(e.response.data.message || e)
        }
      })
  },
  async postStep({ commit }, { jobId, formData }) {
    await this.$axios.post(
      `jobs/${jobId}/steps`,
      {
        step: {
          memo: formData.memo,
          image: formData.image,
          order: formData.order
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
        this.$toast.success('step is successfully created')
      })
      .catch((e) => {
        this.$toast.error(e.response.data.message || e)
      })
  },
  async deleteStep({ commit }, { stepId }) {
    await this.$axios.delete(
      `/steps/${stepId}`,
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
  async putStep({ commit }, { stepId, formData }) {
    await this.$axios.put(
      `/steps/${stepId}`,
      {
        step: {
          memo: formData.memo,
          image: formData.image,
          order: formData.order
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
