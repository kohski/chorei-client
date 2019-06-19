import Cookies from 'universal-cookie'

export const state = () => ({
  uid: '',
  accessToken: '',
  client: '',
  name: '',
  image: '',
  description: ''
})

export const getters = {
  uid: state => state.uid,
  accessToken: state => state.accessToken,
  client: state => state.client
}

export const mutations = {
  setLoginInfo(state, { payload }) {
    state.uid = payload.uid
    state.accessToken = payload['access-token']
    state.client = payload.client
    state.name = payload.name
    state.image = payload.image
    state.description = payload.description
    if (process.client) {
      const cookies = new Cookies()
      const credentials = {
        uid: payload.uid,
        accessToken: payload['access-token'],
        client: payload.client
      }
      cookies.set('chorei-server', credentials, { expire: 365 })
    }
  }
}

export const actions = {
  async signUp({ commit, state }, { email, name, password }) {
    await this.$axios.post(
      `/auth`,
      {
        name: name,
        email: email,
        password: password
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        const payload = res.headers
        Object.assign(payload, res.data.data)
        commit('setLoginInfo', { payload })
      })
      .catch((e) => {
        throw e.response.data.errors.full_messages
      })
  },
  async logIn({ commit, state }, { email, password }) {
    await this.$axios.post(
      `/auth/sign_in`,
      {
        email: email,
        password: password
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        const payload = res.headers
        Object.assign(payload, res.data.data)
        commit('setLoginInfo', { payload })
      })
      .catch((e) => {
        this.$toast.error(e)
      })
  }
}
