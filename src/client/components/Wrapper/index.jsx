import React from 'react';


const handler = () => {
  document.title = 'Nightmare';
};

const Wrapper = ({ children }) => (
  <div role="article">
    <div
      onClick={handler}
      onKeyPress={handler}
      role="presentation"
    >
      {children}
    </div>
  </div>
);

export default Wrapper;
