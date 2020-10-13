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
  register (data) {
    return $axios.$post(`${API_URL}/register`, data)
  }
})
