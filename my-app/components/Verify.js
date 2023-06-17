import { Button } from 'flowbite-react'
import React from 'react'
import { usePrepareContractWrite,useContractWrite } from 'wagmi'
import { collectorAbi,collectorAddress } from '@/contracts/constants'
import { Spinner } from 'flowbite-react'



const Verify = (props) => {
  const idx = props.idx

  const { config } = usePrepareContractWrite({  
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'acceptSubmission',
    
    args: [parseInt(idx)]
    
  })
  const { data, write,isLoading,isSuccess } = useContractWrite(config)
  
  

  return (
    <Button disabled={!write || isLoading} onClick={write}>
        {isLoading ? <Spinner/> :isSuccess?"Verified":"Verify"}
      </Button>
  )
}

export default Verify