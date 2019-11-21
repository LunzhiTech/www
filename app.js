/* *****************************************
 * Copyright (c) 2016-present
 * Heisenberg Co.,Ltd. All rights reserved.
 * Project      : www
 * File         : app.js
 * Created      : 2018-12-02
 * Author       : lee
 * ***************************************** */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const Router = require('koa-router');

const sslPath = process.env.SSL_PATH || path.join(__dirname, 'app', 'ssl');
const ssl = {
    key: fs.readFileSync(path.join(sslPath, 'privkey.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(sslPath, 'fullchain.pem'), 'utf8')
};

const app = new Koa();
app.use(logger());
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(serve(path.join(__dirname, 'dist')));
app.use(bodyParser());
app.keys = ['ljl19920707'];
app.use(session(app));

const router = new Router();
app.use(router.routes());

// configure 404 page
app.use(async (ctx, next) => {
    try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) { ctx.throw(404); }
    } catch (err) {
        if (err.status !== 404) { return; }
        ctx.status = err.status || 500;
        switch (ctx.accepts('html', 'json')) {
            case 'html':
                ctx.type = 'html';
                ctx.body = '<p>Page Not Found</p>';
                break;
            case 'json':
                ctx.type = 'json';
                ctx.body = {
                    message: 'Page Not Found'
                };
                break;
            default:
                ctx.type = 'text';
                ctx.body = 'Page Not Found';
        }
    }
});
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.type = 'html';
        ctx.body = '<p>Something <em>exploded</em>, please contact developer.</p>';
        ctx.app.emit('error', err, ctx);
    }
});

const httpServer = http.createServer(app.callback());
httpServer.listen(80, () => {
    console.log(`[WWW] Http listening on port 80.`);
});
const httpsServer = https.createServer(ssl, app.callback());
httpsServer.listen(443, () => {
    console.log(`[WWW] Https listening on port 443.`);
});

process.on('uncaughtException', (err) => {
    console.error('An uncaught error occurred!');
    console.error(err.stack);
});