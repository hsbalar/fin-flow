import { getUniqueId } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'

export interface ICategory {
  id: string
  name: string
}

export interface AppState {
  dialog: {
    createSheet: boolean
    createCategory: boolean
  }
  categories: ICategory[]
}

const defaultState: AppState = {
  dialog: {
    createSheet: false,
    createCategory: false,
  },
  categories: [],
}

const slice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: {
    toggleDialog: (state: AppState, action) => {
      const { payload } = action as { payload: keyof AppState['dialog'] }
      state.dialog[payload] = !state.dialog[payload]
    },
    createCategory: (state: AppState, action) => {
      const id = getUniqueId()
      state.categories.push({ id, name: action.payload })
      state.dialog.createCategory = false
    },
  },
})

export const { toggleDialog, createCategory } = slice.actions

export default slice.reducer
