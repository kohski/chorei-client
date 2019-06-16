import Cookies from 'universal-cookie'

export default ({ req, route, redirect }) => {
  if (['/'].includes(route.path)) {
    return
  }
  const cookies = req ? new Cookies(req.headers.cookie) : new Cookies()
  const credential = cookies.get('chorei-server')
  if (credential && route.path === '/auth/login') {
    return redirect('/')
  }
  if (!credential && route.path !== '/auth/login') {
    return redirect('/auth/login')
  }
}
