import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './components/footer.jsx'
import Header from './components/Header.jsx'
import LoginCard from './components/LoginCard.jsx'
import SignupCard from './components/SignupCard.jsx'
import Home from './Pages/Home.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:
   <App/>

  },
  {

    path:'/home',
    element:<>
    <Header></Header>
    <Home/>
    <Footer></Footer>
    </>
  },{
    path:'/login',
    element:<>
    <Header></Header>
    <LoginCard/>
    <Footer></Footer>
    </>
  }
  ,{
    path:'/signup',
    element:<>
    <Header></Header>
    <SignupCard/>
    <Footer></Footer>
    </>
  }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
       <App/>
    </RouterProvider>

)
