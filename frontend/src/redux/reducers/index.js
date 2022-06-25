import { combineReducers } from 'redux';
import { user } from './user';
import { graph } from './graph'

export const rootReducer = combineReducers({
  user,
  graph
});
