import React, { useState } from 'react'
import { Table } from 'flowbite-react';
import TableRow from './TableRow';
import TableHead from './TableHead';
import { collectorAbi,collectorAddress,validatorAddress,validatorAbi } from '@/contracts/constants';

import {
  useContractRead,
} from 'wagmi'
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

const YourUpload = () => {
  const{address} = useContext(AuthContext)
  const [data,setData] = useState([])
  const rowC = ["123","0/125","8"]
  const fields = ["Request ID","Status","View"]

  const { data:readData,isLoading,isError } = useContractRead({
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'getSubmissionByAddress',
    args:[address],
    onError(err){
      console.log(err)
    },
    chainId:80001,
    onSuccess(readData){
      console.log(readData,"sub")
      setData(readData)
      // setOpenReq(data)
    }
    
  })

  const rendered = data.map((d,k)=>{
    const list = [parseInt(d.collectionIndex),d.status,
      
      <a className='text-blue-500' href={d.uri} target='_blank'>View</a>]
    return (
<TableRow rowContent={list} key = {k}/>


    )
  })

  return (
    <Table hoverable>
<TableHead heads ={fields}/>
    <Table.Body className="divide-y">
      {rendered}
        
    </Table.Body>
  </Table>
  )
}

export default YourUpload