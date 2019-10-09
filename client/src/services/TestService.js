import Api from '@/services/Api'

export default {
  atest (stockID) {
    return Api().post('test', stockID)
  },
  getPrice (data) {
    return Api().post('getPrice', data)
  }
}
