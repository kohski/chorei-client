// export default ({ store }, { idCategory }) => {
//   let id = 0
//   if (process.server) {
//     id = store.$router.history.current.params.id
//   } else {
//     const currentUrl = store.$router.history.current.path
//     const pendingUrl = store.$router.history.pending.path
//     if (currentUrl.indexOf(idCategory) > 0) {
//       id = store.$router.history.current.params.id
//     } else if (pendingUrl.indexOf(idCategory)) {
//       id = store.$router.history.pending.params.id
//     } else {
//       store.$router.push('/groups')
//     }
//   }
//   return id
// }
