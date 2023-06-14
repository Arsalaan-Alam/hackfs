import React from 'react'
import { Table } from 'flowbite-react';
import TableRow from './TableRow';
import TableHead from './TableHead';



const OpenRequest = () => {
  const rowC = ["123","0/125","8/100","upload button comes here"]
  const fields = ["Request ID","Description","Status","Upload"]


  return (
    <Table hoverable>
<TableHead heads = {fields}/>
    <Table.Body className="divide-y">
    <TableRow rowContent ={rowC}/>

    </Table.Body>
  </Table>
  )
}

export default OpenRequest