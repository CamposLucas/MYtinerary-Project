import {GET_CITIES, CITIES_LOADING} from './types'


export const getCities = () => async dispatch => {
  dispatch(setCitiesLoading());
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