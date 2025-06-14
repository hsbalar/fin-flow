export function aggregateSheetData(sheets: any[], records: any): number {
  return sheets.reduce((sum: number, sheet: any) => {
    const sheetRecords = records[sheet.id] || {}
    return (
      sum +
      Object.entries(sheetRecords).reduce((sheetSum, [, columnData]) => {
        return sheetSum + (columnData as any[]).reduce((colSum, column) => colSum + (Number(column.value) || 0), 0)
      }, 0)
    )
  }, 0)
}

export function aggregateSheetDataForCharts(sheets: any[], records: any): any[] {
  return sheets.reduce((data: any[], sheet: any) => {
    const sheetRecords = records[sheet.id] || {}
    Object.entries(sheetRecords).forEach(([, columnData]: any) => {
      data.push(
        ...columnData
          .filter((row: any) => row.name.trim() !== '')
          .map((row: any) => ({ ...row, value: Number(row.value) || 0 }))
      )
    })
    return data
  }, [])
}
