import { lazy, StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const Footer = React.lazy(() => import('./components/footer.jsx'))
const Header = React.lazy(() => import('./components/Header.jsx'))
const LoginCard = React.lazy(() => import('./components/LoginCard.jsx'))
const SignupCard = React.lazy(() => import('./components/SignupCard.jsx'))
const Home = React.lazy(() => import('./Pages/Home.jsx'))
const Protected = React.lazy(() => import('./components/AuthLayout.jsx'))
const Profile = React.lazy(() => import('./Pages/Profile.jsx'))

 

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
