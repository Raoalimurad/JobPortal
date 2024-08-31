import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from "./authSlice"
import jobSlice from "./jobSlice"
import CompanySlice from "./CompanySlice"
import applicationSlice from "./applicationSlice"

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth:authSlice,
  jobs:jobSlice,
  company:CompanySlice,
  application:applicationSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)






const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export default store