import { combineReducers } from 'redux';
import { user } from './user';
import { graph } from './graph'
import { mode } from './mode';

export const rootReducer = combineReducers({
  user,
  graph,
  mode
});
