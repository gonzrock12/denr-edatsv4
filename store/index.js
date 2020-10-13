import Vuex from 'vuex'
import notifModule from './modules/notifications'
import documentsModule from './modules/documents'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      notifications: notifModule,
      documents: documentsModule
    }
  })
}

export default createStore
