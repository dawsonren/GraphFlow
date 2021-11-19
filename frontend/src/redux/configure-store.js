import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

// Allows us to use Redux DevTools extension for debugging.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
