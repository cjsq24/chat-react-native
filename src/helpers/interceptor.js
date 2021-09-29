import axios from 'axios'
import Config from 'react-native-config'
import { getItemLocal } from './localStorage';
import constants from '../components/constants'

axios.defaults.baseURL = Config.URL_API;

axios.interceptors.response.use(
	async function(response) {
		return response;
	},
	async function(err) {
		try {
			if (err?.response?.data && err?.response?.data?.message) {
				console.log(err.response.data)
				return err.response
			}
			return {
				data: {
					success: false,
					message: err,
					values: {}
				}
			}
		} catch (e) {
			return {
				data: {
					success: false,
					message: e.toString(),
					values: {}
				}
			}
		}
	}
);

axios.defaults.params = {};

axios.interceptors.request.use(async function (config) {
	const user = await getItemLocal(constants.localUser)
	if (user?.token) {
		config.headers.Authorization = `Bearer ${user.token}`
	} else {
		//console.log('no hay token')
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});

export default axios;