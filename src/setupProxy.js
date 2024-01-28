/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');

const API_HOST = process.env.API_HOST || 'http://localhost:3001';

module.exports = function createMiddleware(app) {
  app.use(createProxyMiddleware('/assets', {
    target: {
      protocol: 'https:',
      host: 'dcardsdevstore01.blob.core.windows.net',
      pathname: '/assets'
    },
    changeOrigin: true
  }));
  app.use(createProxyMiddleware('/api', {
    target: API_HOST,
    changeOrigin: true,
    secure: false
  }));
};
