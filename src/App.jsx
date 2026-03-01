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
 
  // const [value, setValue] = useState(0);
  // function handlepost(){
  //   axios.post('http://localhost:3000/iot', {
  //     first_name: 'John'})
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   }
 
  console.log("app rendered");

//   useEffect(() => {
//   const interval = setInterval(() => {
//     fetch("http://localhost:3000/debug")
//       .then(res => res.json())
//       .then(data => setValue(data.value));
//   }, 200);

//   return () => clearInterval(interval);
// }, []);
// useEffect(() => {
//   AuthService.currentUser()
//     .then(response => {
//       return response.json();
//     }).then(data => {
//       console.log("Current user:", data);
//     })
//     .catch(error => {
//       console.error("Error fetching current user:", error);
//     });
// }, []);

  return (
    
   <div className='MainDiv w-full relative'>
    <Header />
    
       
   
   <Footer/>
   </div>
      
   
  )
}

export default App
