'use client';

import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { usePrepareContractWrite,useContractWrite } from 'wagmi'
import { collectorAbi,collectorAddress } from '@/contracts/constants'
import { Spinner } from 'flowbite-react'
import { parseEther, stringToHex } from 'viem'

export default function ModalOffer(properties) {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
const idx = properties.idx

const [ammount,setAmount] = useState("0")
const [uri,setUri] = useState("")

const { config } = usePrepareContractWrite({  
  address: collectorAddress,
  abi: collectorAbi,
  functionName: 'createOffer',
  value:parseEther(ammount),
  
  args: [parseInt(idx),uri,stringToHex("",{size:32})]
  
})
const { data, write,isLoading,isSuccess } = useContractWrite(config)

function handleValue(e){
  setAmount(e.target.value)

}
function handleUri(e){
  setUri(e.target.value)

}


  return (
    <>
      <Button onClick={() => props.setOpenModal('offer-modal')}>Create Offer</Button>
      <Modal show={props.openModal === 'offer-modal'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create a New Offer</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deposit" value="Your Deposit" />
              </div>
              <TextInput onChange={handleValue} value={ammount} id="deposit" placeholder="Amount in matic" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="request"  value="Your Request" />
              </div>
              <TextInput onChange={handleUri} value={uri}  id="request" placeholder="Enter your Request Uri"  required />
            </div>
            
            <div className="w-full">
             <Button disabled={!write || isLoading} onClick={write}>
         {isLoading ? <Spinner/> :isSuccess?"Created":"Create Offer"}
            </Button>
            {isSuccess && (
        <div>
          Successfully Created Offer
          <div>
            <a target ="_blank" className=" text-blue-700"href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>view on mumbai testnet</a>
          </div>
        </div>
      )}
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


