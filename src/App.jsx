import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import './index.css'
import React from 'react'
import Footer from './components/footer'

import { useEffect } from 'react';
import axios from 'axios';
import AuthService from './Services/authservice'

function App() {
 
  
  console.log("app rendered");


  return (
    
   <div className='MainDiv w-full relative'>
    <Header />
    
       
   
   <Footer/>
   </div>
      
   
  )
}

export default App
