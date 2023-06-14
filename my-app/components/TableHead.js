import React from 'react'
import { Table } from 'flowbite-react'
const TableHead = (props) => {
    const heads = props.heads
    const rendered = heads.map(t=><Table.HeadCell>{t}</Table.HeadCell>)
  return (
    <Table.Head>
        {rendered}
  </Table.Head>
  )
}

export default TableHead