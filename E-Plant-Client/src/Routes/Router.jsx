import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Layout from "../Layout/Layout";
import AllPlant from "../Pages/AllPlants/AllPlant";

 export const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children:[
        {
            index:true,
            path:'/',
            Component:Home
        },
        {
          path:'/allplant',
            Component:AllPlant
        }
    ]

  },
]);