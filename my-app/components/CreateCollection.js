'use client';

import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { collectorAddress,collectorAbi } from '@/contracts/constants';
import { useContext, useState } from 'react';

import { parseEther, stringToHex } from 'viem';
import {
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi'
import { AuthContext } from '@/context/AuthContext';




export default function CreateCollection() {
  const zero = BigInt(0)

  
  const {address} = useContext(AuthContext)
  const[request,setRequest] = useState("")
  const[participants,setParticipants] = useState(zero)
  const [amount,setAmount] = useState("0")

  const { config } = usePrepareContractWrite({
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'createCollection',
    value:parseEther(amount),
    args: [address,stringToHex("",{size:32}),request,0,participants]
    
  })
  const { data, write,isLoading,isSuccess } = useContractWrite(config)
  
  

  function handleRequest(e){
    setRequest(e.target.value)

  }

  function handleMaxParticipants(e){
    setParticipants(parseInt(e.target.value))

  }
  function handleAmount(e){
    setAmount(e.target.value)
  }

  async function handleSubmit(){
    try{
      write()
      while(isLoading){}
      

      setParticipants(zero)
      setRequest("")
      setAmount("0")

    }
    catch{
      err=>alert(err)
    }
  }

  return (
    <div className="flex max-w-md flex-col gap-4 m-auto">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="request"
            value="Enter Request String"
          />
        </div>
        <TextInput
          id="request"
          required
          shadow
          value={request}
          onChange={handleRequest}
          
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="maxParticipants"
            value=" Max Participants"
          />
        </div>
        <TextInput
          id="maxParticipants"
          required
          shadow
          value={participants}
          onChange={handleMaxParticipants}
          
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="Amount"
            value=" Set Pool"
          />
        </div>
        <TextInput
          id="amount"
          required
          shadow
          value={amount}
          onChange={handleAmount}
          
        />
      </div>

      <Button disabled={!write || isLoading} onClick={handleSubmit}>
        {isLoading ? <Spinner/> : 'Create New Collection'}
      </Button>
      {isSuccess && (
        <div>
          Successfully submitted your collection
          <div>
            <a target ="_blank" className=" text-blue-700"href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>view on Polygonscan testnet</a>
          </div>
        </div>
      )}
    </div>
  )
}


