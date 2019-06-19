// import Vue from 'vue'
import Cookies from 'universal-cookie'

export default function ({ $axios, redirect, req }) {
  $axios.onRequest((config) => {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies()
    const credential = cookies.get('chorei-server')
    if (credential) {
      config.headers.common.uid = credential.uid
      config.headers.common['access-token'] = credential.accessToken
      config.headers.common.client = credential.client
    }
  })
}
