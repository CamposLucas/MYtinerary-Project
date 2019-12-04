import {GET_ITINERARIES, NO_ITINERARIES} from './types'


export const getItineraries = (id) => dispatch => {
  fetch(`http://localhost:5000/itinerary/${id}`)
  .then(res => {
    return res.json()
  })
  .then(datos => {
    if (datos.length === 0) {
      dispatch({
        type: NO_ITINERARIES
      })
    } else {
      dispatch({
        type: GET_ITINERARIES,
        payload: datos
      })
    }
  })
  .catch(err => {
    console.log(err)
  })
}


