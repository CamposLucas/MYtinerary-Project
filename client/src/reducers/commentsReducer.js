import {GET_COMMENTS, UPDT_COMMENT} from '../actions/types'

const initialState = {
  comments: [],
  aux: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };
    case UPDT_COMMENT:
      return {
        ...state,
        aux: !state.aux
      }
    default: 
      return state;
  }
}