import React from 'react'
import { Table } from 'flowbite-react';
import ListCompRequest from './ListCompRequest';


const OpenRequest = () => {
  return (
    <Table hoverable>
    <Table.Head>
      <Table.HeadCell>
        Request ID
      </Table.HeadCell>
      <Table.HeadCell>
        Time Created
      </Table.HeadCell>
      <Table.HeadCell>
        Description
      </Table.HeadCell>
      <Table.HeadCell>
        Status
      </Table.HeadCell>
      <Table.HeadCell>
        Submit
      </Table.HeadCell>
    </Table.Head>
    <Table.Body className="divide-y">
        <ListCompRequest/>
        <ListCompRequest/>

    </Table.Body>
  </Table>
  )
}

export default OpenRequest