// @flow
import React, { type Element } from 'react';


type Props = {
  children: Element<any>,
  onClick(Event): void,
};

const Clickable = (props: Props) => {
  const { onClick, children } = props;
  return (
    <div role="article">
      <div
        onClick={onClick}
        onKeyPress={onClick}
        role="presentation"
      >
        {children}
      </div>
    </div>
  );
}

export default Clickable;
