import React, { useMemo, useRef, useEffect } from 'react'
import {
  Column,
  Table as TableInstance,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table'
import { useDispatch } from 'react-redux'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { updateRecord, addRecord } from '@/state/reducers/sheet'
import { Column as MultiColumn } from '../../model'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (index: number, columnId: string, value: unknown) => void
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value as string}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
        className="w-full bg-transparent outline-none border-none p-1"
      />
    )
  },
}

const DataTable = ({data, columnId, sheetId}: {data: RowData[], columnId: string, sheetId: string}) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const columns = useMemo<ColumnDef<MultiColumn>[]>(
    () => [
      {
        accessorFn: row => row.name,
        id: 'name',
        header: () => <span>Name</span>,
        footer: props => props.column.id,
        cell: ({ getValue, row: { index }, column: { id }, table }) => {
          const initialValue = getValue()
          // We need to keep and update the state of the cell normally
          const [value, setValue] = React.useState(initialValue)

          // When the input is blurred, we'll call our table meta's updateData function
          const onBlur = () => {
            table.options.meta?.updateData(index, id, value)
          }

          // If the initialValue is changed external, sync it up with our state
          React.useEffect(() => {
            setValue(initialValue)
          }, [initialValue])

          return (
            <input
              ref={index === data.length - 1 ? inputRef : undefined}
              value={value as string}
              onChange={e => setValue(e.target.value)}
              onBlur={onBlur}
              className="w-full bg-transparent outline-none border-none p-1"
            />
          )
        },
      },
      {
        accessorKey: 'amount',
        header: () => 'Amount',
        footer: props => props.column.id,
      },
    ],
    [data.length]
  )

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (index: number, key: string, value: unknown) => {
        dispatch(updateRecord({
          sheetId,
          columnId,
          index,
          data: { 
            [key]: value
          }
        }))
      },
    },
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [data.length])

  return (
    <div className="border rounded-md overflow-auto">
      <Table>
        <TableHeader className="bg-gray-100 border-b">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="hover:bg-gray-50">
              {headerGroup.headers.map(header => (
                <TableHead 
                  key={header.id} 
                  className="border border-gray-200 p-2 font-semibold text-gray-700"
                >
                  {header.isPlaceholder ? null : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow 
              key={row.id} 
              className="hover:bg-gray-50 border-b border-gray-200 last:border-b-0"
            >
              {row.getVisibleCells().map(cell => (
                <TableCell 
                  key={`cell-${cell.column.id}-${row.id}`} 
                  className="border border-gray-200 p-1 h-10 min-w-[100px]"
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Tab' && 
                      cell.column.id === table.getHeaderGroups()[0].headers[table.getHeaderGroups()[0].headers.length - 1].id && 
                      row.index === table.getRowModel().rows.length - 1
                    ) {
                      e.preventDefault();
                      dispatch(addRecord({ columnId }));
                      inputRef.current?.focus();
                    }
                  }}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable