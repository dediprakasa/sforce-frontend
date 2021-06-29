import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'

const rootReducer = combineReducers({
  auth: authSlice,
})

export default configureStore({
  reducer: rootReducer,
})
