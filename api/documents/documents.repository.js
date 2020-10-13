// const API_URL = 'http://192.168.254.107:8080/api'
import { API_URL } from '@/utils/constant'

export default $axios => ({
  /**
   * discription here
   *
   * @param   {number}  id
   *
   * @return  {Promise}
   */

  action (id) {
    return $axios.$get(`${API_URL}/actions/${id}`)
  },

  received (id) {
    return $axios.$get(`${API_URL}/actions/${id}/edit`)
  },

  route (data) {
    return $axios.$post(`${API_URL}/actions`, data)
  },

  isroute (id) {
    return $axios.$get(`${API_URL}/documents/${id}/edit`)
  },

  userdocs (id) {
    return $axios.$get(`${API_URL}/documents/${id}`)
  },

  updatedoc (data, id) {
    return $axios.$put(`${API_URL}/documents/${id}`, data)
  },

  newdoc (data) {
    return $axios.$post(`${API_URL}/documents`, data)
  },

  deletedoc (id) {
    return $axios.$delete(`${API_URL}/documents/${id}`)
  },

  actiondoc (data, id) {
    return $axios.$put(`${API_URL}/actions/${id}`, data)
  },

  log (data) {
    return $axios.$post(`${API_URL}/logs`, data)
  },

  outgoing (id) {
    return $axios.$get(`${API_URL}/logs/${id}`)
  },

  watch (data) {
    return $axios.$post(`${API_URL}/watches`, data)
  },

  getwatch (id) {
    return $axios.$get(`${API_URL}/watches/${id}`)
  },

  deletewatch (id) {
    return $axios.$delete(`${API_URL}/watches/${id}`)
  },

  track (id) {
    return $axios.$get(`${API_URL}/track/${id}`)
  }

})
