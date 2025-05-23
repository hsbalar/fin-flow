import { getUniqueId } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'

export interface ICategory {
  id: string
  name: string
}

export interface IDashboard extends ICategory {}

export interface AppState {
  dialog: {
    createCard: boolean
    createSheet: boolean
    createCategory: boolean
    createDashboard: boolean
  }
  activeDashboard: IDashboard | null
  categories: ICategory[]
  dashboards: IDashboard[]
}

const defaultState: AppState = {
  dialog: {
    createCard: false,
    createSheet: false,
    createCategory: false,
    createDashboard: false,
  },
  activeDashboard: null,
  categories: [],
  dashboards: [],
}

const slice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: {
    toggleDialog: (state: AppState, action) => {
      const { payload } = action as { payload: keyof AppState['dialog'] }
      state.dialog[payload] = !state.dialog[payload]
    },
    setActiveDashboard: (state: AppState, action) => {
      state.activeDashboard = action.payload
    },
    createCategory: (state: AppState, action) => {
      const id = getUniqueId()
      state.categories.push({ id, name: action.payload })
      state.dialog.createCategory = false
    },
    createDashboard: (state: AppState, action) => {
      const id = getUniqueId()
      state.dashboards.push({ id, name: action.payload })
      state.dialog.createDashboard = false
    },
  },
})

export const { toggleDialog, createCategory, createDashboard, setActiveDashboard } = slice.actions

export default slice.reducer
