import React from 'react'
import TableHead from './TableHead'
import TableRow from './TableRow'
import { Table } from 'flowbite-react'


const Submissions = () => {
    const fields = ["request id","submitted by","view","verify","reject"]
    const rowC = ["123","0/125","8"]

  return (
    <Table hoverable>
<TableHead heads = {fields}/>
<Table.Body className="divide-y">
<TableRow rowContent = {rowC}/>
<TableRow rowContent = {rowC}/>
<TableRow rowContent = {rowC}/>
<TableRow rowContent = {rowC}/>
</Table.Body>
  </Table>

    
  )
}

export default Submissions