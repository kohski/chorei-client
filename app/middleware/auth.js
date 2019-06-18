import Cookies from 'universal-cookie'
// import Vue from 'vue'

export default ({ req, route, redirect }) => {
  if (['/'].includes(route.path)) {
    return
  }
  const cookies = req ? new Cookies(req.headers.cookie) : new Cookies()
  const credential = cookies.get('chorei-server') ? cookies.get('chorei-server') : ''
  if (credential.uid) {
    return
  }
  // this.$toast.error('please, log in.')
  return redirect('/auth/login')
}
