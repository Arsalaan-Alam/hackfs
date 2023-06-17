import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { upload } from '../../testEncrypt.js';

export default function Home() {
  const [buttonText, setButtonText] = useState('Click me');

  const handleClick = async() => {
    const result = await upload()
    console.log(result)
    setButtonText('Button clicked!');
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
}
