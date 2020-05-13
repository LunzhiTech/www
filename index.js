/* *****************************************
 * Copyright (c) 2016-present
 * Heisenberg Co.,Ltd. All rights reserved.
 * Created      : 2018-12-02
 * Author       : lee
 * ***************************************** */

const http = require('http');
const path = require('path');
const Koa = require('koa');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const Router = require('@koa/router');

async function main() {
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
            if (status === 404) {
                ctx.throw(404);
            }
        } catch (err) {
            if (err.status !== 404) {
                return;
            }
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

    // By use ingress in kubernetes, you should create http server in port 80 and 443, and don't need to create https server.
    const server80 = http.createServer(app.callback());
    server80.listen(80, () => {
        // eslint-disable-next-line no-console
        console.log(`[WWW] Http listening on port 80.`);
    });
    const server443 = http.createServer(app.callback());
    server443.listen(443, () => {
        // eslint-disable-next-line no-console
        console.log(`[WWW] Http listening on port 443.`);
    });
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('main catch exception: ', err)
})

process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error('process on exception: ', err)
})
