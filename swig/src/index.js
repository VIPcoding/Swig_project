import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashborad from './Components/Dashboard';


const route= createBrowserRouter([{
  path: "/",
  element: <App/>
},
{
  path: "/Dashboard",
  element: <Dashborad/>
},

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={route}/>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
