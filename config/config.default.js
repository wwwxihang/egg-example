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

    // mysql
    config.mysql = {
        // database configuration
        client: {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'wxh12345!',
            database: 'wwwxh',
        },
        // load into app, default true
        app: true,
        // load into agent, default false
        agent: false,
    }

    // 日志
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
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};
