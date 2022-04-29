
import { createStore } from 'vuex'
import user from './module/user'
import app from './module/app'

export default createStore({
  modules: {
    user,
    app
  }
})