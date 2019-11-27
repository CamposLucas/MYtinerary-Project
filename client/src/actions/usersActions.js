import {POST_USER} from './types'


export const postUser = () => async dispatch => {
  await fetch('http://localhost:5000/cities')
  .then(res => {
    return res.json()
  })
  .then(datos => {
    dispatch({
      type: GET_CITIES,
      payload: datos
    })
  })
  .catch(err => {
    console.log(err)
  })
}

export const setCitiesLoading= () => {
  return {
    type: CITIES_LOADING
  }
}