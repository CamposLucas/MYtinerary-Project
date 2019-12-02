import { combineReducers } from 'redux';
import citiesReducer from './citiesReducer'
import itineraryReducer from './itineraryReducer';
import activitiesReducer from './activitiesReducer';
import authReducer from "./authReducer";

export default combineReducers({
  city: citiesReducer,
  itinerary: itineraryReducer,
  activity: activitiesReducer,
  auth: authReducer,
});