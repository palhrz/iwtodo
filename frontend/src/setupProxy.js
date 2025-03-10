const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'api',
    createProxyMiddleware({
      target: 'https://iwtodo.onrender.com',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
