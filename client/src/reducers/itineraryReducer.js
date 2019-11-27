import {GET_ITINERARIES, NO_ITINERARIES} from '../actions/types'

const initialState = {
  itineraries: [],
  isEmpty: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ITINERARIES:
      return {
        ...state,
        itineraries: action.payload,
        isEmpty: false
      }
    case NO_ITINERARIES:
      return {
        ...state,
        isEmpty: true
      }
    default: 
      return state;
  }
}