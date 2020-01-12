import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const persistConfig = {
    key: 'root',
    storage
}

const reducers = persistReducer(persistConfig, rootReducer);
const middlewares = [thunk];

const store = createStore(
    reducers,
    undefined,
    compose(applyMiddleware(...middlewares))
)
const persistor = persistStore(store);

export { store, persistor };