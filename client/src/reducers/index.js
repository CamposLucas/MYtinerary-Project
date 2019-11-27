import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer'
import itineraryReducer from './itineraryReducer';
import activitiesReducer from './activitiesReducer';

export default combineReducers({
  city: citiesReducer,
  itinerary: itineraryReducer,
  activity: activitiesReducer
});