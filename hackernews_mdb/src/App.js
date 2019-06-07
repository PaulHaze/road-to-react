import React from 'react';
import { MDBContainer } from 'mdbreact';

const App = () => {
  return (
    <MDBContainer>
      <h1 className="text-center">Book List</h1>
      <hr />
      <BookTable />
    </MDBContainer>
  );
};

export default App;
