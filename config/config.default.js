/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1552448015135_6457';

    // add your middleware config here
    config.middleware = ['gzip'];
    config.gzip = {
        // enable: false,
        // match: '/user',
        match(ctx) {
            // 只有 ios 设备才开启
            const reg = /iphone|ipad|ipod|Mac/i;
            return reg.test(ctx.get('user-agent'));
        },
        threshold: 1024, // 小于 1k 的响应体不压缩
    }

    // 启动配置项
    config.cluster = {
        listen: {
            // port: 7002,
            // hostname: '127.0.0.1',
            // path: '/var/run/egg.sock',
        }
    }

    // mysql
    // config.mysql = {
    //     // database configuration
    //     client: {
    //         host: 'localhost',
    //         port: '3306',
    //         user: 'root',
    //         password: 'wxh12345!',
    //         database: 'wwwxh',
    //     },
    //     // load into app, default true
    //     app: true,
    //     // load into agent, default false
    //     agent: false,
    // }

    // 日志
    config.logger = {
        // 关闭所有打印到文件的日志：
        // level: 'NONE',
        // 默认编码为 utf-8，可通过如下方式覆盖：
        // encoding: 'gbk',
        outputJSON: true,
        consoleLevel: 'DEBUG',
    }
    config.customLogger = {
        // 定时任务日志
        scheduleLogger: {
            // consoleLevel: 'NONE',
            // file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
        },
    }

    // 安全
    config.security = {
        csrf: {
            enable: false,
            // useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
            // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
            // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
            // cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
            // sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
            // headerName: 'x-csrf-token'
        }
    }

    // HttpClient
    config.httpclient = {
        // 是否开启本地 DNS 缓存，默认关闭，开启后有两个特性
        // 1. 所有的 DNS 查询都会默认优先使用缓存的，即使 DNS 查询错误也不影响应用
        // 2. 对同一个域名，在 dnsCacheLookupInterval 的间隔内（默认 10s）只会查询一次
        enableDNSCache: false,
        // 对同一个域名进行 DNS 查询的最小间隔时间
        dnsCacheLookupInterval: 10000,
        // DNS 同时缓存的最大域名数量，默认 1000
        dnsCacheMaxLength: 1000,

        request: {
            // 默认 request 超时时间
            timeout: 3000,
        },

        httpAgent: {
            // 默认开启 http KeepAlive 功能
            keepAlive: true,
            // 空闲的 KeepAlive socket 最长可以存活 4 秒
            freeSocketTimeout: 4000,
            // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
            timeout: 30000,
            // 允许创建的最大 socket 数
            maxSockets: Number.MAX_SAFE_INTEGER,
            // 最大空闲 socket 数
            maxFreeSockets: 256,
        },

        httpsAgent: {
            // 默认开启 https KeepAlive 功能
            keepAlive: true,
            // 空闲的 KeepAlive socket 最长可以存活 4 秒
            freeSocketTimeout: 4000,
            // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
            timeout: 30000,
            // 允许创建的最大 socket 数
            maxSockets: Number.MAX_SAFE_INTEGER,
            // 最大空闲 socket 数
            maxFreeSockets: 256,
        }
    }

    // 
    config.onerror = {
        all(err, ctx) {
            // 在此处定义针对所有响应类型的错误处理方法
            // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
            ctx.body = 'error';
            ctx.status = 500;
        },
        html(err, ctx) {
            // html hander
            ctx.body = '<h3>error</h3>';
            ctx.status = 500;
        },
        json(err, ctx) {
            // json hander
            ctx.body = { message: 'error' };
            ctx.status = 500;
        },
        jsonp(err, ctx) {
            // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
        },
    }

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    }

    return {
        ...config,
        ...userConfig,
    };
};
