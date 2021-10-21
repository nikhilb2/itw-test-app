const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const next = require('next');

const { APP_PREVENT_SSL } = process.env;

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

const app = next({ dev: isDev });
const handle = app.getRequestHandler();

const trusted = ['fonts.googleapis.com', 'fonts.gstatic.com'];

app.prepare().then(() => {
  const PORT = process.env.PORT || 3000;

  const server = express();

  // use helmet for security
  server.use(
    // we want to set "X-XSS-Protection" ourselves
    helmet({
      xssFilter: false,
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'"],
          'connect-src': ["'self'", process.env.API_URL, ...trusted],
          'font-src': ["'self'", '*.gstatic.com'],
          'frame-src': ["'self'"],
          'img-src': ["'self'", 'data:', 'blob:', ...trusted],
          'object-src': ["'self'"],
          'script-src': ["'self'", ...trusted],
          'script-src-elem': ["'self'", ...trusted],
          'style-src': ["'self'", "'unsafe-inline'", ...trusted],
          'style-src-elem': ["'self'", "'unsafe-inline'", ...trusted],
        },
      },
    }),
  );

  // enable xss protection header
  // it is still vulnerable to SCA (side channel attack),
  // but it's PROBABLY harder to perform than XSS
  // https://github.com/helmetjs/helmet/issues/230
  server.use((req, res, cb) => {
    res.set('X-XSS-Protection', '1; mode=block');
    cb();
  });

  // don't allow requests with invalid http methods
  server.use((req, res, cb) => {
    if (!/^(GET|OPTIONS|HEAD)$/.test(req.method)) {
      res.status(400).end();
      return;
    }

    cb();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) {
      throw err;
    }

    process.stdout.write(`🚀 Ready on port ${PORT}\n`);
  });
});
