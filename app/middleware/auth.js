import Cookies from 'universal-cookie'

export default ({ req, route, redirect }) => {
  if (['/'].includes(route.path)) {
    return
  }
  const cookies = req ? new Cookies(req.headers.cookie) : new Cookies()
  const credential = cookies.get('chorei-server')
  console.log(credential)
  if (credential) {
    return
  }
  return redirect('/auth/login')
}
