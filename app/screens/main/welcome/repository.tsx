import {saveIsLoggedIn, saveLocalUser} from '../../auth/login/repository'

const logout = () =>
  new Promise<void>((resolve, reject) => {
    saveLocalUser({})
      .then(() => {
        saveIsLoggedIn(false)
          .then(() => {
            resolve()
          })
          .catch(e => {
            reject(e)
          })
      })
      .catch(e => {
        reject(e)
      })
  })

export {logout}
