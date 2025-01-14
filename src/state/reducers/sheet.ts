import { getUniqueId } from '@/lib/utils'
import { createSlice } from '@reduxjs/toolkit'

export interface Record {
  name: string
  value: number
  date: string
}

export interface Column {
  id: string
  name: string
}

export interface Sheet {
  id: string
  name: string
  description: string
  columns: Array<Column>
}

export interface RecordBySheet {
  [key: string]: {
    [key: string]: Array<Record>
  }
}

export interface SheetState {
  activeSheet: Sheet | null
  sheets: Array<Sheet>
  records: RecordBySheet
}

const defaultState: SheetState = {
  activeSheet: null,
  sheets: [],
  records: {},
}

const slice = createSlice({
  name: 'sheet',
  initialState: defaultState,
  reducers: {
    setActiveSheet: (state: SheetState, action) => {
      const sheet = { ...action.payload, recordBySheet: [] }
      state.activeSheet = sheet
    },
    addSheet: (state: SheetState, action) => {
      state.sheets.push({ id: getUniqueId(), columns: [], ...action.payload })
    },
    updateSheet: (state: SheetState, action) => {
      const sheet = state.sheets.find((_, index) => index === action.payload.index)
      if (sheet) {
        sheet.name = action.payload.name
        sheet.description = action.payload.description
      }
    },
    updateRecord: (state: SheetState) => {
      console.log('updateRecord', state)
    },
  },
})

export const { addSheet, updateSheet, setActiveSheet } = slice.actions

export default slice.reducer
