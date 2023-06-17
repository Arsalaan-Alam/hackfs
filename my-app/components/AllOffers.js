import React ,{useState}from 'react'
import TableHead from './TableHead'
import TableRow from './TableRow'
import { Table } from 'flowbite-react'

import { useContractRead } from 'wagmi'
import { collectorAbi,collectorAddress } from '@/contracts/constants'
import { parseEther } from 'viem'

const AllOffers = () => {
    const fields = ["request id","Amount( in Wei )","request uri","accept","reject"]
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
      const list = [parseInt(d.collectionIndex),parseFloat(d.deposit),d.requestURI,
,"accept","reject"]
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