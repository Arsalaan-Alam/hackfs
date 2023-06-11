import React from 'react'
import { Table } from 'flowbite-react';
import ListCompYourUploads from './ListCompYourUploads';


const YourUpload = () => {
  return (
    <Table hoverable>
    <Table.Head>
      <Table.HeadCell>
        File Name
      </Table.HeadCell>
      <Table.HeadCell>
        TimeStamp
      </Table.HeadCell>
      <Table.HeadCell>
        Submitted To
      </Table.HeadCell>
      <Table.HeadCell>
        Request Help
      </Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
        
<ListCompYourUploads/>
<ListCompYourUploads/>
    </Table.Body>
  </Table>
  )
}

export default YourUpload