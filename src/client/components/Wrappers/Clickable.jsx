import React from 'react';


const handler = () => {
  document.title = 'Nightmare';
};

const Clickable = ({ children }) => (
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

export default Clickable;
