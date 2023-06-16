import React, { useState } from 'react'
import { Button, Table } from 'flowbite-react';
import { ethers } from "ethers";
import TableRow from './TableRow';
import TableHead from './TableHead';
import { collectorAbi,collectorAddress,validatorAddress,validatorAbi } from '@/contracts/constants';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
  usePublicClient
} from 'wagmi'


const OpenRequest = () => {
  const [openReq,setOpenReq] = useState([])
  const [idx,setidx] = useState(0)
  const [uri,setUri] = useState("")




  const rowC = ["123","0/125","8/100","upload button comes here"]
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
  const { config } = usePrepareContractWrite({
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'createSubmission',
    // value:parseEther("0"),
    args: [idx,uri]
    
  })
  const { data:contractWite, write,isLoading:loadingContractWrite,isSuccess } = useContractWrite(config)

  const submit = (idx)=>{
    const uri = "new uri"
    setUri(uri)
    setidx(idx)
    
    write()

  
  


  // write()


  }
  console.log(data,isLoading,isError)

  const rendered = openReq.map((d,k)=>{
    const list =[k,d.request,`${d.acceptedSubmissionCount}/${d.maxParticipants}`,<Button onClick={()=>submit(k)}>upload</Button>]
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