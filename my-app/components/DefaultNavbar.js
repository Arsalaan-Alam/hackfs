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
        <img
          alt="Logo"
          className="mr-3 h-6 sm:h-9"
          src=""
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          MedDao
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          href="https://github.com/Arsalaan-Alam/hackfs/tree/main/my-app"
          target='_blank'
        >
          <BsGithub className='h-5 w-5'/>
        </Navbar.Link>
        <Navbar.Link

          href="#"
        >
          <p>
            Features
          </p>
        </Navbar.Link>
        {path==="/Validator"?<Navbar.Link href="/">
          User Login
        </Navbar.Link>:<Navbar.Link href="/Validator">
          Validator Login
        </Navbar.Link>}
        {!isDisconnected && <Navbar.Link href="#" onClick={logout}>
          Logout
        </Navbar.Link>}

      </Navbar.Collapse>
    </Navbar>
  )
}


