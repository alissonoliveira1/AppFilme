//Base da Url
//https://api.themoviedb.org/3/

//Url Modavel

import Axios from 'axios'

const api = Axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})
export default api