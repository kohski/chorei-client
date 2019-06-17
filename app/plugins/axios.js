import Cookies from 'js-cookie'

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const credential = Cookies.get('chorei-server')
    if (credential) {
      const credentials = JSON.parse(credential)
      config.headers.common.uid = credentials.uid
      config.headers.common['access-token'] = credentials.accessToken
      config.headers.common.client = credentials.client
    }
  })

  $axios.onError((error) => {
    // Vue.toasted.error(error)
    console.log(`error${error}`)
    return redirect('/auth/login')
  })
}
