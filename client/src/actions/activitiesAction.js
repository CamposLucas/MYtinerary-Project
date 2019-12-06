import {GET_ACTIVITIES, ACT_LOADING} from './types'

export const getActivities = (id) => async dispatch => {
    dispatch(setActLoading());
    await fetch(`http://localhost:5000/activities/${id}`)
    .then(res => {
      return res.json()
    })
    .then(datos => {
      if(datos) {
        dispatch({
          type: GET_ACTIVITIES,
          payload: datos
        })
      } else {
        dispatch({
          type: GET_ACTIVITIES,
          payload: []
        })
      }
        
    })
    .catch(err => {
      console.log(err)
    })
  }

export const setActLoading = () => {
  return {
    type: ACT_LOADING
  }
}