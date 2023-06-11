'use client';

import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import OpenRequest from './OpenRequest';
import YourUpload from './YourUpload';
import YourRequest from './YourRequest';
import PayoutHistory from './PayoutHistory';

export default function DefaultTabs() {
  return (
    <Tabs.Group
      aria-label="Default tabs"
      style="default"
    >
      <Tabs.Item
        active
        icon={HiUserCircle}
        title="Your Uploads"
      >
        <YourUpload/>
      </Tabs.Item>
      <Tabs.Item
        icon={MdDashboard}
        title="Open Requests"
      >
        <OpenRequest/>
      </Tabs.Item>
      <Tabs.Item
        icon={HiAdjustments}
        title="Your Requests"
      >
<YourRequest/>
      </Tabs.Item>
      <Tabs.Item
        icon={HiClipboardList}
        title="Payout History"
      >
        <PayoutHistory/>
      </Tabs.Item>
      
    </Tabs.Group>
  )
}


