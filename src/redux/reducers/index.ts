import { combineReducers } from 'redux';
import auth from './authReducer';
import selection from './selectionReducer';

const rootReducer = combineReducers({
  auth,
  selection
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
