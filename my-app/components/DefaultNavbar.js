'use client';

import { Navbar } from 'flowbite-react';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function DefaultNavbar() {
  const {isDisconnected,logout} = useContext(AuthContext)

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
          href="#"
        >
          <p>
            GitHub
          </p>
        </Navbar.Link>
        <Navbar.Link

          href="#"
        >
          <p>
            Features
          </p>
        </Navbar.Link>
        <Navbar.Link href="#">
          Aggregator Login
        </Navbar.Link>
        <Navbar.Link href="#" onClick={logout}>
          Logout
        </Navbar.Link>

      </Navbar.Collapse>
    </Navbar>
  )
}


