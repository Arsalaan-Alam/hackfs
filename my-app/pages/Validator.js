import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter, Updock } from '@next/font/google'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import DefaultTabs from '@/components/DefaultTabs';
import Welcome from '@/components/Welcome';

import Upload from '@/components/Upload';
import CreateCollection from '@/components/CreateCollection';
import YourCollection from '@/components/YourCollection';
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
const [isVerified,setIsVerified] = useState(true)

const {data,isError} = useContractRead({
  address:validatorAddress,
  abi:validatorAbi,
  functionName:"validatorStatus",
  args:[address]
})

const verify = ()=>{


}


const verifyButton = <div className='mt-48'>
  <Button className='m-auto'>Verify As Validator</Button>
  </div>



  return (
    <main className="">
    {!isVerified && verifyButton}
    {isVerified && 
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