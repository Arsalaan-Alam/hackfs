import React ,{useState}from 'react'
import TableHead from './TableHead'
import TableRow from './TableRow'
import { Table } from 'flowbite-react'

import { useContractRead } from 'wagmi'
import { collectorAbi,collectorAddress } from '@/contracts/constants'
import { formatEther, parseEther } from 'viem'
import AcceptOffer from './AcceptOffer'
import RejectOffer from './RejectOffer'
import Execute from './Execute'
import { useEnsName } from 'wagmi'

const AllOffers = () => {
    const fields = ["request id","created by","Amount","request command ","reject","execute On bacalhau"]
    const rowC = ["123","0/125","8"]
    const [data,setData] = useState([])
    const { data:readData,isLoading,isError } = useContractRead({
      address: collectorAddress,
      abi: collectorAbi,
      functionName: 'getAllOffers',
      // args:[address],
      onError(err){
        console.log(err)
      },
      chainId:80001,
      onSuccess(readData){
        console.log(readData,"sub")
        setData(readData)
        // setOpenReq(data)
      }
      
    })
  
    const rendered = data.map((d,k)=>{
      const address = d.creator
    //   const {data:ensName} = useEnsName({
    //     address:address
    // })
      const visibleAddress = address?.slice(0,5) +"..."+address?.slice(-4)
      const command = d.requestURI
      const visibleCommand = command?.slice(0,5) +"..."+command?.slice(-4)
    
      const list = [parseInt(d.collectionIndex),visibleAddress,formatEther(d.deposit),visibleCommand,
,<RejectOffer idx = {k}/>,<Execute idx = {parseInt(d.collectionIndex)} request={d.requestURI} offerIndex = {k}/>]
      return (
  <TableRow rowContent={list} key = {k}/>
  
  
      )
    })

  return (
    <Table hoverable>
<TableHead heads = {fields}/>
<Table.Body className="divide-y">
{rendered}
</Table.Body>
  </Table>

    
  )
}

export default AllOffers