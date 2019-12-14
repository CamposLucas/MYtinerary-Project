import {GET_COMMENTS} from './types';
import axios from 'axios';

export const getComments = (id) => async dispatch => {
  await axios.get(`http://localhost:5000/itinerary/comments/${id}`)
    .then(res => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      })
    })
    .catch(e  => {
      console.log(e)
    })
}

