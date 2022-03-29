import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { BrowserRouter } from 'react-router-dom';

import { Nav } from "./Navbar/Nav";
import { Workplace } from "./Workplace/Workplace";

import { autoLogin } from "./actions/userActions";


export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  return (
    <BrowserRouter>
      <Nav/>
      <Workplace/>
    </BrowserRouter>
  )
}



//render(<App/>, document.getElementById('app'));