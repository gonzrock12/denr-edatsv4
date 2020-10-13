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

  levels () {
    return $axios.$get(`${API_URL}/levels`)
  },
  services (id) {
    return $axios.$get(`${API_URL}/services/${id}`)
  },
  getdivisions (data) {
    return $axios.$get(`${API_URL}/divisions?level_id=${data.level_id}&services_id=${data.services_id}`)
  },
  division (data) {
    return $axios.$post(`${API_URL}/division`, data)
  },
  section (data) {
    return $axios.$post(`${API_URL}/section`, data)
  },
  divisionbylevel (id) {
    return $axios.$get(`${API_URL}/divisions/${id}`)
  },
  sectionbylevel (id) {
    return $axios.$get(`${API_URL}/sections/${id}`)
  }
})
