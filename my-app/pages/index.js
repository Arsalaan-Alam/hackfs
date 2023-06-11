import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import DefaultTabs from '@/components/DefaultTabs';
import Welcome from '@/components/Welcome';
import DefaultTable from '@/components/DefaultTable';
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {isDisconnected,logout} = useContext(AuthContext)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {isDisconnected && <ConnectButton/>}
        {!isDisconnected && 
        <div className='md:w-3/4 w-full m-auto p-4'>
          <Welcome/>
        <DefaultTabs/>
          </div>}
        {/* <DefaultTable/> */}

      </main>
    </>
  )
}
