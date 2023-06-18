import React, { useState } from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import DefaultTabs from '@/components/DefaultTabs';
import Welcome from '@/components/Welcome';


import CreateCollection from '@/components/CreateCollection';

import AllOffers from '@/components/AllOffers';
import Submissions from '@/components/Submissions';
import { Button } from 'flowbite-react';
import { useContractRead } from 'wagmi';
import { validatorAbi, validatorAddress } from '@/contracts/constants';
import OpenRequest from '@/components/OpenRequest';

const Validator = () => {
  const {isDisconnected,ensName,address} = useContext(AuthContext)
  const UserTabs = ["All Collections","All Offers","Create Collection","Submissions"]
  const TabComponents = [<OpenRequest/>,<AllOffers/>,<CreateCollection/>,<Submissions/>]
const [isVerified,setIsVerified] = useState(false)

const {data,isError} = useContractRead({
  address:validatorAddress,
  abi:validatorAbi,
  functionName:"validatorStatus",
  args:[address],
  onSuccess(data){
    console.log(data)
  }
})

const verify = ()=>{
  if(1){
    setIsVerified(true)
  }
  else(false)



}


const verifyButton = <div className='mt-48'>
  <Button onClick={verify} className='m-auto'>Verify As Validator</Button>
  </div>



  return (
    <main className="">
      {isDisconnected && (
          <div className='topmain'>
          <p className='headin'>Welcome to MedDAO</p>
          <p className= "desc">We revolutionize medical research by incentivizing patient contributions to create decentralized datasets  for AI-driven <br></br> healthcare advancements. Completely anonymous, aggregrated, encrypted & secure platform. </p>
          <div className="flex justify-center">
           
            <ConnectButton />
          </div>
          </div>
        )}
    {!isDisconnected && !isVerified && verifyButton}
    {!isDisconnected && isVerified && 
    <div className='md:w-3/4 w-full m-auto p-4'>
      <Welcome/>
    <DefaultTabs tabs = {UserTabs} tabC = {TabComponents}/>
    {/* <Upload/> */}
      </div>}
    {/* <DefaultTable/> */}

  </main>
  )
}

export default Validator