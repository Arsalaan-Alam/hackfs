import React, { useState } from 'react'
import { Button, Table } from 'flowbite-react';
import { ethers } from "ethers";
import TableRow from './TableRow';
import TableHead from './TableHead';
import { collectorAbi,collectorAddress,validatorAddress,validatorAbi } from '@/contracts/constants';
import {
  
  
  
  useContractRead,
  
} from 'wagmi'
import Upload from './Upload';


const OpenRequest = () => {
  const [openReq,setOpenReq] = useState([])
  // const [idx,setidx] = useState(0)
  // const [uri,setUri] = useState("")




  // const rowC = ["123","0/125","8/100","upload button comes here"]
  const fields = ["Request ID","Description","Status","Upload"]


  const { data,isLoading,isError } = useContractRead({
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'getAllCollections',
    onError(err){
      console.log(err)
    },
    // args:[],
    chainId:80001,
    onSuccess(data){
      setOpenReq(data)
    }
    
  })


  // const submit = (idx)=>{
  //   const uri = "new uri"
  //   setUri(uri)
  //   setidx(idx)
    
  //   write()

  
  


  // // write()


  // }
  console.log(data,isLoading,isError)

  const rendered = openReq.map((d,k)=>{
    const list =[k,d.request,`${d.acceptedSubmissionCount}/${d.maxParticipants}`,<Upload idx = {k}/>]
    return(
    <TableRow key = {k} rowContent ={list}/>


    )
  })

  return (<>
    {/* <Button onClick={get}>click</Button> */}
    <Table hoverable>
<TableHead heads = {fields}/>
    <Table.Body className="divide-y">
      {rendered}
    </Table.Body>
  </Table>
  </>

  )
}

export default OpenRequest