/**
 * @file implements languageSlice
 */
import { createSlice } from '@reduxjs/toolkit'
import { LanguageStateType } from '../types/LanguageStateType'

// initial state
const initialState = {
  language : {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript (Node.js 12.14.0)",
    value: "javascript"
  }
}

/**
 * Language slice with reducers. 
 */
export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
     
    }
  }
})

// action selector
export const { setLanguage } = languageSlice.actions

// reducer
export default languageSlice.reducer