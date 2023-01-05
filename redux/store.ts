/**
 * Implements store
 */
import { configureStore } from '@reduxjs/toolkit'
import languageReducer from "./languageSlice"


// redux store aggregates all reducers into one
export const store = configureStore({
  reducer: {
    language: languageReducer
  }
})