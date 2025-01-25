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
  isMulti: boolean
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
      const id = getUniqueId()
      state.sheets.push({ id, columns: [], ...action.payload })
      state.records[id] = {}
      if (!action.payload.isMulti) {
        state.records[id].default = []
      }
    },
    updateSheet: (state: SheetState, action) => {
      const sheet = state.sheets.find((_, index) => index === action.payload.index)
      if (sheet) {
        sheet.name = action.payload.name
        sheet.description = action.payload.description
      }
    },
    updateSheetWithSingleColumn: (state: SheetState, action) => {
      const sheet = state.sheets.find((_, index) => index === action.payload.index)
      if (sheet) {
        sheet.columns.push(action.payload.column)
      }
    },
    updateRecord: (state: SheetState, action) => {
      const { index, data } = action.payload
      if (state.activeSheet) {
        const sheetId = state.activeSheet.id
        if (state.records[sheetId] && state.records[sheetId].default) {
          state.records[sheetId].default[index] = { ...state.records[sheetId].default[index], ...data }
        }
      }
    },
    addRecord: (state: SheetState, action) => {
      if (state.activeSheet) {
        const {id} = state.activeSheet
        if (!state.activeSheet.isMulti) {
          state.records[id].default.push(action.payload)
        }
      }
      
    },
    deleteRecord: (state: SheetState, action) => {
      const { index } = action.payload
      if (state.activeSheet) {
        const sheetId = state.activeSheet.id
        if (state.records[sheetId] && state.records[sheetId].default) {
          state.records[sheetId].default.splice(index, 1)
        }
      }
    },
  },
})

export const { addSheet, updateSheet, setActiveSheet, addRecord, updateRecord, deleteRecord } = slice.actions

export default slice.reducer
