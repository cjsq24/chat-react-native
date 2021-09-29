import axios from '../../helpers/interceptor'
import { actions } from './userReducer'
import { removeItemLocal, setItemLocal } from '../../helpers/localStorage'
import constants from '../../components/constants'
import { getToken } from '../../helpers/pushNotification'

const base = '/users'

const action = {
   list: (_data = {}) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.get(`${base}/list`, {params: _data})
      await dispatch(actions.list(data))
   },
   login: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      _data.device_token = await getToken()
      const {data} = await axios.post(`${base}/login`, _data)
      await dispatch(actions.login(data))
      if (data.success) {
         await setItemLocal(constants.localUser, data.values)
         alert('Logueado con éxito')
      } else {
         alert('Usuario o clave incorrecta')
      }
      return data;
   },
   logout: () => async (dispatch, getState) => {
      return await removeItemLocal(constants.localUser)
   },
   filter: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.get(`${base}/filter`, {params: {search: _data}})
      await dispatch(actions.filter(data))
      return data;
   },
   get: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.get(`${base}/get/${_data}`)
      await dispatch(actions.get())
      return data;
   },
   register: (_data) => async (dispatch, getState) => {
      await dispatch(actions.loading())
      const {data} = await axios.post(`${base}/register`, _data)
      await dispatch(actions.list(data))
      if (!data.success) {
         alert('No se ha podido registrar tu usuario')
      }
      return data;
   },
}

export default action