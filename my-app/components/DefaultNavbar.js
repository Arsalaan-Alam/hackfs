'use client';

import { Navbar } from 'flowbite-react';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import {BsGithub} from "react-icons/bs"


export default function DefaultNavbar() {
  const {isDisconnected,logout} = useContext(AuthContext)

  const router = useRouter()

  const path = router.pathname
  

  return (
    <Navbar
      fluid
    >
      <Navbar.Brand

        href="/"
      >
        
        <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white headingg">
         💊 MedDAO
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
       
      <Navbar.Link href="#">
          <p className="paratest">Features</p>
        </Navbar.Link>

        {path==="/Validator"?<Navbar.Link href="/" className='paratest'>

          User Login
        </Navbar.Link>:<Navbar.Link href="/Validator" className='paratest'>
          Validator Login
        </Navbar.Link>}

        {!isDisconnected && <Navbar.Link href="#" onClick={logout} className='paratest'>
          Logout
        </Navbar.Link>}


        <Navbar.Link
          href="https://github.com/Arsalaan-Alam/hackfs/tree/main/my-app"
          target='_blank'
        >
          <BsGithub className='h-5 w-5 helg'/>
        </Navbar.Link>

      </Navbar.Collapse>
    </Navbar>
  )
}


