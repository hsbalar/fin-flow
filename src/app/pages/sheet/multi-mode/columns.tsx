import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Column } from "../../model"

const columns = useMemo<ColumnDef<Column>[]>(
    () => [
      {
            accessorFn: row => row.name,
            id: 'name',
            header: () => <span>Name</span>,
            footer: props => props.column.id,
      },
      {
            accessorKey: 'amount',
            header: () => 'Amount',
            footer: props => props.column.id,
      },
    ],
    []
  )

export default columns