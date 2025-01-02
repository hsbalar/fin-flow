import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  dialog: {
    createSheet: boolean
  }
}

const defaultState: AppState = {
  dialog: {
    createSheet: true,
  },
}

const slice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: {
    toggleDialog: (state: AppState, action) => {
      const { payload } = action as { payload: keyof AppState['dialog'] }
      state.dialog[payload] = !state.dialog[payload]
    },
  },
})

export const { toggleDialog } = slice.actions

export default slice.reducer
