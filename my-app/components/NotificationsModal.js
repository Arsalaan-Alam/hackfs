'use client';

import { Button, Modal } from 'flowbite-react';
import { BiBell } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import NotificationCard from './NotificationCard';
import {channels,payloads,user,utils,alias }from "@pushprotocol/restapi";
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import { createSocketConnection, EVENTS } from '@pushprotocol/socket'
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
// import * as dotenv from 'dotenv'
import { ethers } from 'ethers'
import { GetStaticProps } from 'next';
// import { useWalletClient } from 'wagmi';
// import { ethers } from 'ethers';
// dotenv.config()

// export const getStaticProps = async () => {
// const env = ENV.STAGING // choose ENV.STAGING or ENV.PROD
// const showAPIResponse = true
// const channelPrivateKey = process.env.WALLET_PRIVATE_KEY
// console.log(channelPrivateKey)
// const signerChannel = new ethers.Wallet(`0x${channelPrivateKey}`)
// const channelAddress = signerChannel.address
  
//   return { props: { env,showAPIResponse,channelAddress } }
// }

const env = ENV.STAGING // choose ENV.STAGING or ENV.PROD
const showAPIResponse = true
const channelPrivateKey = process.env.WALLET_PRIVATE_KEY
console.log(channelPrivateKey)
const signerChannel = new ethers.Wallet(`0x${"283970708adf59d1301bd90bc03487e7d1aacf3ba873ea90ad30e610afd32838"}`)
const channelAddress = signerChannel.address
export default function NotificationsModal() {




    const {address} = useContext(AuthContext)
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [isSubscribed,setIsSubscribed] = useState(false)
  const [notifications,setNotifications] = useState([])

  console.log(address,channelAddress,isSubscribed)


  async function PushAPI_user_getSubscriptions(
    silent = !showAPIResponse
  ) {
    const subscriptions = await user.getSubscriptions({
      user: `eip155:5:${address}`, // user address in CAIP
      env: env 
    })
  
    console.log('PushAPI.user.getSubscriptions | Response - 200 OK')
    if (!silent) {
      console.log(subscriptions)
    }
    return subscriptions
  }

    async function PushAPI_channels_subscribe() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const response = await channels.subscribe({

          signer: signer,
          channelAddress: `eip155:5:${channelAddress}`, // channel address in CAIP
          userAddress: `eip155:5:${address}`, // user address in CAIP
          onSuccess: () => {
            console.log('opt in success')
          },
          onError: () => {
            console.error('opt in error')
          },
          env: env,
        })
      
        console.log('PushAPI.channels.subscribe | Response - 200 OK')
        if (true) {
          console.log(response)
        }
      }

      async function PushAPI_user_getFeeds() {
        const notifications = await user.getFeeds({
          user: `eip155:5:${address}`, // user address in CAIP
          env: env 
        })
      
        console.log('PushAPI.user.getFeeds | Response - 200 OK')
        if (true) {
          console.log(notifications)
        }
        return notifications
      }

      const rendered = notifications.map(n=>{
        return(
            <NotificationCard head = {n.title} content ={n.message}/>
        )
      })


      useEffect(()=>{

        address && PushAPI_user_getSubscriptions().then(data=>{
            for(var i = 0; i< data?.length;i++){
                if(data[i].channel === channelAddress){
                setIsSubscribed(true)
                break}

            }
           

        })

            address &&PushAPI_user_getFeeds().then(n=>setNotifications(n))
        // pushSDKSocket.connect()


      },[isSubscribed,address])
      

  return (
    <>
      <BiBell className='h-6 w-6 helg' onClick={() => props.setOpenModal('dismissible')}/>
      <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>All Notifications</Modal.Header>
        {isSubscribed && <Modal.Body>
          <div className="space-y-6">
                {rendered}
          </div>
        </Modal.Body>}
        {!isSubscribed &&
        <Modal.Body>
        <div className="space-y-6">
              <Button onClick={()=>{
              PushAPI_channels_subscribe()
              setIsSubscribed(true) }}>Subscribe to get notifications</Button>
        </div>
      </Modal.Body>
        }
    
      </Modal>
    </>
  )
}


