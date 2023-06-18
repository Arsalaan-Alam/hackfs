import React, { useState } from 'react'
import { useContractRead } from 'wagmi'
import { collectorAbi,collectorAddress } from '@/contracts/constants'
import { Button } from 'flowbite-react'
import { usePrepareContractWrite,useContractWrite } from 'wagmi'
import { Spinner } from 'flowbite-react'


const Execute = (props) => {
  const [cid,setCid] = useState("")
  const [loadingExecute,setLoadingExecute] = useState(false)
  const [doneExecute,setDoneExecute] = useState(false)

  const { data:readData } = useContractRead({
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'getSubmissionsByCollectionIndex',
    args:[props.idx],
    onError(err){
      console.log(err)
    },
    chainId:80001,
    
  })

  const { config } = usePrepareContractWrite({  
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'updateOffer',
    
    args: [parseInt(props.offerIndex),cid]
    
  })
  const { data, write,isLoading,isSuccess } = useContractWrite(config)
  
  async function handleExecute(){
    const data = {
      input_cid: readData[0].uri.split(".")[0].slice(8), 
      cmd: props.request

    }
    try{
      setLoadingExecute(true)

    

    const res = await fetch('/api/bacalhau', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify(data),
    })
    const result = await res.json()
    const cid = result.cid
    console.log(cid)
    setCid(cid)
  }
  catch(err){
    console.log(err)
  }
  finally{
    setLoadingExecute(false)
    setDoneExecute(true)
  }
    
  }
  const ExecuteButton = <Button disabled={ loadingExecute} onClick={handleExecute}>
{loadingExecute? <Spinner/> : doneExecute?"Done":"Execute on bacalhau"}
</Button>

  const AcceptButton = <Button disabled={!write || isLoading} onClick={write}>
{isLoading ? <Spinner/> : isSuccess?"Accepted and Updated":"Accept"}
</Button>


if(cid){
  return AcceptButton
}else{
  return ExecuteButton
}
  
}

export default Execute