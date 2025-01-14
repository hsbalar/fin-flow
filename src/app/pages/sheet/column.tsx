import React from 'react'

interface ColumnProps {
  title: string
  children: React.ReactNode
}

const Column: React.FC<ColumnProps> = ({ title, children }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="column-content">{children}</div>
    </div>
  )
}

export default Column
