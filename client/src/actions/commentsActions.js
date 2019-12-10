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

export const putComments = (id, data) => async dispatch => {
  await axios.put(`http://localhost:5000/itinerary/comments/postcomment/${id}`, data)
    .then(res => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      });
    })
    .catch(e => {
      console.log(e)
    })
}

export const updateComment = (id, data) => async dispatch => {
  await axios.put(`http://localhost:5000/itinerary/comments/updatecomment/${id}`, data)
  .then(res => {
     return res
  })
  .then(data => {
    dispatch({
      type: GET_COMMENTS,
      payload: data.data
    })
  })
  .catch(e => {
    console.log(e)
  })
 
}

