import { getUniqueId } from '@/lib/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Record {
  id: string
  name: string
  value: number | string
  date: string
}

export interface Column {
  id: string
  name: string
}

export interface Sheet {
  id: string
  categoryId: string
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

const getNewRecord = () => {
  return {
    id: getUniqueId(),
    name: '',
    date: '',
    value: '',
  }
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
      const columnId = getUniqueId()
      state.sheets.push({ id, columns: [{ id: columnId, name: 'Column 1' }], ...action.payload })
      state.records[id] = {
        [columnId]: [getNewRecord()],
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
      const { sheetId, columnId, index, data } = action.payload
      state.records[sheetId][columnId][index] = { ...state.records[sheetId][columnId][index], ...data }
    },
    addRecord: (state: SheetState, action: PayloadAction<{ columnId?: string }>) => {
      if (state.activeSheet) {
        const { id } = state.activeSheet
        const columnId = action.payload.columnId || state.activeSheet.columns[0].id
        state.records[id][columnId].push(getNewRecord())
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
    addColumn: (state: SheetState, action: PayloadAction<{ sheetId: string; column: Column }>) => {
      const { sheetId, column } = action.payload
      const sheet = state.sheets.find((s) => s.id === sheetId)
      if (sheet) {
        sheet.columns.push(column)
        state.records[sheetId][column.id] = []
      }
    },
  },
})

export const { addSheet, updateSheet, setActiveSheet, addRecord, updateRecord, deleteRecord, addColumn } = slice.actions

export default slice.reducer
