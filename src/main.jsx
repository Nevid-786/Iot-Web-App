import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './components/footer.jsx'
import Header from './components/Header.jsx'
import LoginCard from './components/LoginCard.jsx'
import SignupCard from './components/SignupCard.jsx'
import Home from './Pages/Home.jsx'
import Protected from './components/AuthLayout.jsx'
import Profile from './Pages/Profile.jsx'
 

const router=createBrowserRouter([
  {
    path:'/',
    element:
   <Protected authentication={true}>
      <Header></Header>
    <Home/>
    <Footer></Footer>
    </Protected>

  },
  {

    path:'/home',
    element:<Protected authentication={true}>
      <Header></Header>
    <Home/>
    <Footer></Footer>
    </Protected>
  },{
    path:'/login',
    element:<Protected authentication={false}>
      <Header></Header>
    <LoginCard/>
    <Footer></Footer>
    </Protected>
  }
  ,{
    path:'/signup',
    element:<Protected authentication={false}>
      <Header></Header>
    <SignupCard/>
    <Footer></Footer>
    </Protected>
  },
  {
    path:"/profile",
    element:<Protected authentication={true}>
      <Header></Header>
    <Profile/>
    <Footer></Footer>
    </Protected>
  }
])

createRoot(document.getElementById('root')).render(

   <Provider store={store}>
    <RouterProvider router={router}/>
    
    </Provider>
)
