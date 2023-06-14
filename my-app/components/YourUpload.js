import React from 'react'
import { Table } from 'flowbite-react';
import TableRow from './TableRow';
import TableHead from './TableHead';



const YourUpload = () => {
  const rowC = ["123","0/125","8"]
  const fields = ["Request ID","Submitted To","Status","Claim","View"]


  return (
    <Table hoverable>
<TableHead heads ={fields}/>
    <Table.Body className="divide-y">
        
<TableRow rowContent={rowC}/>
    </Table.Body>
  </Table>
  )
}

export default YourUpload