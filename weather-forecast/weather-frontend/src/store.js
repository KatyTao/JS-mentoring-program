import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { userInfo, loginState } from './reducer';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
  key: 'root',
  storage,
}


const combinedReducer = combineReducers({ userInfo, loginState })

const persistedReducer = persistReducer(persistConfig, combinedReducer)

export const configureStore = () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}