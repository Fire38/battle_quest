import React from 'react';


import { BrowserRouter } from 'react-router-dom';

import { Nav } from "./Navbar/Nav";
import { Workplace } from './Workplace/Workplace';


export const App = () => {
  return (
    <BrowserRouter>
      <Nav/>
      <Workplace/>
    </BrowserRouter>
  )
}



//render(<App/>, document.getElementById('app'));