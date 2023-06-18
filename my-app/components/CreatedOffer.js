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
import { formatEther } from 'viem';

const CreatedOffer= () => {
  const{address} = useContext(AuthContext)
  const [data,setData] = useState([])
  const rowC = ["123","0/125","8"]
  const fields = ["Request ID","deposit","Requested Command","status","Result"]

  const { data:readData,isLoading,isError } = useContractRead({
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'getOffersByAddress',
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
    const status = d.status === 0 ? "pending": d.status===1?"accepted":"rejected"
    const command = d.requestURI
    const visibleCommand = command?.slice(0,5) +"..."+command?.slice(-4)
    const result = `https://ipfs.io/ipfs/${d.resultURI}`
    const list = [parseInt(d.collectionIndex),formatEther(d.deposit),visibleCommand,status,<a href={result} target='_blank'>{d.resultURI}</a>]
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

export default CreatedOffer