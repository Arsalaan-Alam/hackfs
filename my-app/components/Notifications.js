import React from 'react'
import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import { createSocketConnection, EVENTS } from '@pushprotocol/socket'
import * as dotenv from 'dotenv'
import { ethers } from 'ethers'
dotenv.config()

const channelPrivateKey = process.env.WALLET_PRIVATE_KEY
const signerChannel = new ethers.Wallet(`0x${channelPrivateKey}`)
const channelAddress = signerChannel.address
const env = process.env.PUSH_NODE_NETWORK // choose ENV.STAGING or ENV.PROD
const Notifications = () => {


    async function PushAPI_channels_subscribe(silent = !showAPIResponse) {
        const response = await PushAPI.channels.subscribe({
          // @ts-ignore
          signer: signer,
          channelAddress: `eip155:5:${channelAddress}`, // channel address in CAIP
          userAddress: `eip155:5:${signer.address}`, // user address in CAIP
          onSuccess: () => {
            console.log('opt in success')
          },
          onError: () => {
            console.error('opt in error')
          },
          env: env as ENV,
        })
      
        console.log('PushAPI.channels.subscribe | Response - 200 OK')
        if (!silent) {
          console.log(response)
        }
      }


      async function PushAPI_payloads_sendNotification__direct_payload_group_of_recipient_subset(
        silent = !showAPIResponse
      ) {
        const apiResponse = await PushAPI.payloads.sendNotification({
          signer: signerChannel, // Need to resolve to channel address
          type: 4, // subset
          identityType: 2, // direct payload
          notification: {
            title: `notification TITLE:`,
            body: `notification BODY`,
          },
          payload: {
            title: `payload title`,
            body: `sample msg body`,
            cta: '',
            img: '',
          },
          recipients: [
            `eip155:5:${signer.address}`,
            `eip155:5:${signerSecondAccount.address}`,
          ], // recipient addresses
          channel: `eip155:5:${signerChannel.address}`, // your channel address
          env: env as ENV,
        })
      
        console.log('PushAPI.payloads.sendNotification | Response - 204 OK')
        if (!silent) {
          console.log(apiResponse)
        }
      }
      
      // Push Notification - Direct payload for all recipients(broadcast)
      // PushAPI.payloads.sendNotification
      async function PushAPI_payloads_sendNotification__direct_payload_all_recipients_brodcast(
        silent= !showAPIResponse
      ) {
        const apiResponse = await PushAPI.payloads.sendNotification({
          signer: signerChannel, // Needs to resolve to channel address
          type: 1, // broadcast
          identityType: 2, // direct payload
          notification: {
            title: `notification TITLE:`,
            body: `notification BODY`,
          },
          payload: {
            title: `payload title`,
            body: `sample msg body`,
            cta: '',
            img: '',
          },
          channel: `eip155:5:${signerChannel.address}`, // your channel address
          env: env as ENV,
        })
      
        console.log('PushAPI.payloads.sendNotification | Response - 204 OK')
        if (!silent) {
          console.log(apiResponse)
        }
      }


      async function PushSDKSocket(silent = !showAPIResponse) {
        const pushSDKSocket = createSocketConnection({
          user: `eip155:5:${signer.address}`, // CAIP, see below
          socketOptions: { autoConnect: false },
          env: env as ENV,
        })
      
        if (!pushSDKSocket) {
          throw new Error('PushSDKSocket | Socket Connection Failed')
        }
      
        pushSDKSocket.connect()
      
        pushSDKSocket.on(EVENTS.CONNECT, async () => {
          console.log('Socket Connected - will disconnect after 4 seconds')
      
          // send a notification to see the result
          await PushAPI_payloads_sendNotification__direct_payload_single_recipient(
            true
          )
        })
      
        pushSDKSocket.on(EVENTS.DISCONNECT, () => {
          console.log('Socket Disconnected')
        })
      
        pushSDKSocket.on(EVENTS.USER_FEEDS, (feedItem) => {
          // feedItem is the notification data when that notification was received
          console.log('Incoming Feed from Socket')
          if (!silent) {
            console.log(feedItem)
          }
      
          // disconnect socket after this, not to be done in real implementations
          pushSDKSocket.disconnect()
        })
      
        const delay = (ms) =>
          new Promise((resolve) => setTimeout(resolve, ms))
        await delay(4000)
      }
      



  return (
    <div>Notifications</div>
  )
}

export default Notifications