import Api from '@/services/Api'

export default {
  atest (stockID) {
    return Api().post('test', stockID)
  },
  getPrice (data) {
    return Api().post('getPrice', data)
  },
  getHourlyPrice (data) {
    return Api().post('getHourlyPrice', data)
  },
  setID () {
    return Api().post('setID')
  },
  getID (searchID) {
    return Api().post('getID', searchID)
  }
}
