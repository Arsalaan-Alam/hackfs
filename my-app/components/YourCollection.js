import React from 'react'
import TableHead from './TableHead'
import TableRow from './TableRow'
import { Table } from 'flowbite-react'


const YourCollection = () => {
    const fields = ["Request ID","Description","Status","Offers"]
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

export default YourCollection