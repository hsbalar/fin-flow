import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1'
import logger from 'redux-logger'

import sheet from './reducers/sheet'
import app from './reducers/app'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducers: any = combineReducers({
  app,
  sheet,
})

export type RootState = ReturnType<typeof store.getState>

const _persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
})

export const persistor = persistStore(store)
