import React from 'react'
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

const Validator = () => {
  const {isDisconnected,ensName} = useContext(AuthContext)
  const UserTabs = ["Your Collections","All Offers","Create Collection","Submissions"]
  const TabComponents = [<YourCollection/>,<AllOffers/>,<CreateCollection/>,<Submissions/>]

  return (
    <main className="">
    {isDisconnected && <ConnectButton/>}
    {!isDisconnected && 
    <div className='md:w-3/4 w-full m-auto p-4'>
      <Welcome/>
    <DefaultTabs tabs = {UserTabs} tabC = {TabComponents}/>
    <Upload/>
      </div>}
    {/* <DefaultTable/> */}

  </main>
  )
}

export default Validator