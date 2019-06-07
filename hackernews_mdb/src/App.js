import React from 'react';
import { MDBContainer } from 'mdbreact';
import BookTable from './components/BookTable';

import './App.css';

const App = () => {
  return (
    <MDBContainer className="App-container mx-auto mt-5 blue-grey lighten-5 shadow-box-example z-depth-2">
      <h1 className="text-center pt-4">Book List</h1>
      <hr />
      <BookTable />
    </MDBContainer>
  );
};

export default App;
