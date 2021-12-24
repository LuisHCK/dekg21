import axios from 'axios'
import Cookie from 'js-cookie'
import moment from 'moment'

const HTTPClient = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
})

HTTPClient.interceptors.request.use((config) => {
    const authToken = Cookie.get('authToken')
    const tokenExpiration = moment(Cookie.get('tokenExpiration'))
    const tokenValid = moment() < tokenExpiration

    if (config.headers && authToken && authToken !== 'undefined' && tokenValid) {
        config.headers['Authorization'] = `Bearer ${authToken}`
    }
    return config
})

export default HTTPClient
