import Cookies from 'universal-cookie'
// import Vue from 'vue'

export default ({ req, route, redirect, store }) => {
  if (['/', '/auth/login', 'auth/signup'].includes(route.path)) {
    return
  }
  if (store.$router.history.pending && ['/', '/auth/login', '/auth/signup'].includes(store.$router.history.pending.path)) {
    return
  }
  const cookies = req ? new Cookies(req.headers.cookie) : new Cookies()
  const credential = cookies.get('chorei-server') ? cookies.get('chorei-server') : ''
  if (!credential && credential.uid === '') {
    return redirect('/auth/login')
  }
  store.dispatch('auth/getUser')
}
