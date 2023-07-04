import React, { useState, useEffect } from 'react';
import './index.css';
import ReactDOM from 'react-dom';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
// import Add from "./routes/Add";
import Edit from "./routes/Edit";
import Note from "./routes/Note";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/home",
    element: <Root />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
  // {
  //   path: "/add",
  //   element: <Add />,
  // },
  {
    path: "*",
    element: <Note />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
