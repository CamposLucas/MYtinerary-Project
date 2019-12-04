import axios from 'axios';
import { GET_FAVS } from './types';

export const getFavs = (id) => dispatch => {
    axios.get(`http://localhost:5000/users/likes/${id}`)
        .then(res => {
           dispatch({
               type: GET_FAVS,
               payload: res.data
           })
        })
        .catch(err => {
            console.log(err)
        })
}

