import { dom } from '@fortawesome/fontawesome-svg-core';
import { Helmet } from 'react-helmet';


const minifyCss = css => css.replace(/\n/g, '').replace(/\s\s+/g, '').replace(/\s+/g, '');

const helmet = Helmet.renderStatic();

export default ({
  hash,
  browserEnv = {},
  markup,
  initialState,
}) => `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  <style>${minifyCss(dom.css())}</style>
  <link rel="stylesheet" href="styles.${hash}.css"/>
</head>
<body ${helmet.bodyAttributes.toString()}>
  <div id="root">${markup}</div>
  <script>
    window.initialState = ${JSON.stringify(initialState)};
    window.browserEnv = ${JSON.stringify(browserEnv)};
  </script>
  <script src="bundle.${hash}.js"></script>
</body>
</html>`;
