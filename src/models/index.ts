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

export interface Card {
  id: string
  dashboardId?: string
  name: string
  description: string
  type: 'Section' | 'Chart'
  sheetIds: string[]
  config: {
    chartType: 'Bar' | 'Pie' | 'PieDonut' | 'Radial'
    layout?: 'horizontal' | 'vertical'
    showLabel?: boolean
    showLegend?: boolean
  }
}
