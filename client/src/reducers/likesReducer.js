import {GET_FAVS} from '../actions/types';

const initialState = {
    liked: []
}

export default function (state = initialState, action) {
    switch(action.type){
        case GET_FAVS: 
            return {
                ...state,
                liked: action.payload
            }
        default:
            return state
    }
}