import React from 'react';
import { renderToString } from 'react-dom/server';
import htmlTemplate from '../htmlTemplate';
import Root from '../../shared/RootComponent';
// import { matchPath } from 'react-router-dom';


export default ({
  clientStats, serverStats, title,
}) => (req, res) => {
  const context = {};
  const initialState = {};
  const markup = renderToString(
    <Root
      server
      location={req.url}
      context={context}
    />
  );
  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
      htmlTemplate({
        initialState,
        markup,
        title,
      })
    );
  }
};
