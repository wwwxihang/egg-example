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
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
