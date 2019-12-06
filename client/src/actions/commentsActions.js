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

export const putComments = (id, data) => dispatch => {
  axios.put(`http://localhost:5000/itinerary/comments/postcomment/${id}`, data)
    .then(res => {
      console.log(res.data)
      dispatch(getComments(id));
    })
    .catch(e => {
      console.log(e)
    })
}

