import { dom } from '@fortawesome/fontawesome-svg-core';
import { default as minifyCssString } from 'minify-css-string';
import { Helmet } from 'react-helmet';


const helmet = Helmet.renderStatic();

export default ({
  app = 'main',
  stylesheet = '/public/style.css',
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
  <style>${minifyCssString(dom.css())}</style>
  <link rel="stylesheet" href="${stylesheet}"/>
</head>
<body ${helmet.bodyAttributes.toString()}>
  <div id="root">${markup}</div>
  <script>
    window.initialState = ${JSON.stringify(initialState)};
    window.browserEnv = ${JSON.stringify(browserEnv)};
  </script>
  <script src="/public/${app}.bundle.js"></script>
</body>
</html>`;
