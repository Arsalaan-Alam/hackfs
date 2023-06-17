'use client';

import { Tabs } from 'flowbite-react';


export default function DefaultTabs(props) {
  const tabs = props.tabs
  const tabComponents = props.tabC
  const rendered = tabs.map((tab,k)=>{
    return(
      <Tabs.Item
      key={k}
      
      
      
      title={tab}
    >
    

      {tabComponents[k]}
      
    </Tabs.Item>
    )
  })

  return (
    <Tabs.Group
      aria-label="Default tabs"
      style="default"
      className='m-auto tbs'
    >
      {/* <Tabs.Item
        active
        
        title="Your Uploads"
      >
        <YourUpload/>
      </Tabs.Item>
      <Tabs.Item
        
        title="Open Requests"
      >
        <OpenRequest/>
      </Tabs.Item>
      <Tabs.Item
        
        title="Your Requests"
      >
      <YourRequest/>
      </Tabs.Item>
      <Tabs.Item

        title="Payout History"
      >
        <PayoutHistory/>
      </Tabs.Item> */}
      {rendered}
      
    </Tabs.Group>
  )
}


