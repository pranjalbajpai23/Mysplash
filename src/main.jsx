import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import siteStore from './store/index.js'
import Home from './routes/Home.jsx'
import SignIn from './routes/SignIn.jsx'
import SignUp from './routes/SignUp.jsx'
import Profile from './routes/Profile.jsx'
const router=createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:'/SignIn',
      element: <SignIn/>
    },
    {
      path: '/SignUp',
      element: <SignUp />
    },
    {
      path:'/User',
      element:<Profile/>
    }
  ]
}])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={siteStore}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
