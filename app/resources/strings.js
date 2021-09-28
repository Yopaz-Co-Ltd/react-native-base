import LocalizedStrings from 'react-native-localization'

let strings = new LocalizedStrings({
  en: {
    welcome: {
      title: 'Welcome',
      logout: 'Logout',
    },
    login: {
      title: 'Login',
      username: 'Username',
      password: 'Password',
      login: 'Login',
    },
  },
})

export default strings
