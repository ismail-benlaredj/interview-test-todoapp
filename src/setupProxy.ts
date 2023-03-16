import { createProxyMiddleware } from 'http-proxy-middleware';
import { MAIN_API } from '@const/index';
module.exports = function (app: any) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: MAIN_API,
            changeOrigin: true
        })
    );
};