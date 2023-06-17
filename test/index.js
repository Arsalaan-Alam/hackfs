import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { encryptAndUpload } from '@/encrypt/encrypt.js';

export default function Home() {
  const [buttonText, setButtonText] = useState('Click me');

  const handleClick = async() => {
    const result = await encryptAndUpload('../../test/testfile.txt')
    console.log(result)
    setButtonText('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
}
