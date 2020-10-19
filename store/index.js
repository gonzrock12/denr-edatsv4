import Vuex from 'vuex'
import notifModule from './modules/notifications'
import documentsModule from './modules/documents'
import chartModule from './modules/chart'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      notifications: notifModule,
      documents: documentsModule,
      chart: chartModule
    }
  })
}

export default createStore
