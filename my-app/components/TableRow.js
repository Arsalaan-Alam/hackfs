import React from 'react'
import { Table } from 'flowbite-react'

const TableRow = (props) => {
    const rowContent = props.rowContent
    const rendered = rowContent.map(r=><Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
    {r}
  </Table.Cell>)
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
 
    {rendered}
  </Table.Row>
  )
}

export default TableRow