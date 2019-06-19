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
  client: state => state.client,
  showInfo: (state) => {
    return {
      name: state.name,
      image: state.image,
      description: state.description,
      email: state.uid
    }
  }
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
  },
  setShowInfo(state, { name, uid, image, description }) {
    state.name = name
    state.uid = uid
    state.image = image
    state.description = description
  }
}

export const actions = {
  async signUp({ commit, state }, { email, name, password, image, description }) {
    await this.$axios.post(
      `/auth`,
      {
        name: name,
        email: email,
        image: image,
        password: password,
        description: description
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
        this.$router.push('/groups')
      })
      .catch((e) => {
        if (process.client) {
          this.$toast.error(e.response.statusText || e)
        }
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
  },
  async getUser({ commit }) {
    await this.$axios.get(
      `/auth/validate_token`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then((res) => {
        const payload = res.data.data
        commit('setShowInfo', payload)
      })
      .catch((e) => {
        this.$toast.error(e)
      })
  }
}
