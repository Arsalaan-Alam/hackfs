import React from 'react'
import { Table } from 'flowbite-react'

const TableRow = (props) => {
    const rowContent = props.rowContent
    const rendered = rowContent.map(r=><Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
    {r}
  </Table.Cell>)
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      Apple MacBook Pro 17"
    </Table.Cell>
    <Table.Cell>
      Sliver
    </Table.Cell>
    <Table.Cell>
      Laptop
    </Table.Cell>
    <Table.Cell>
      $2999
    </Table.Cell>
    <Table.Cell>
      <a
        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        href="/tables"
      >
        <p>
          Edit
        </p>
      </a>
    </Table.Cell> */}
    {rendered}
  </Table.Row>
  )
}

export default TableRow