class AppBootHook {
    /**
     * Controller，Middleware，Helper，Service 中都可以通过 this.app 访问到 Application 对象，
     * 例如 this.app.config 访问配置对象。
     * 在 app.js 中 app 对象会作为第一个参数注入到入口函数中
     */
    constructor(app) {
        this.app = app;
    }

    // 配置文件即将加载，这是最后动态修改配置的时机
    configWillLoad() {
        // 此时 config 文件已经被读取并合并，但是还并未生效
        // 这是应用层修改配置的最后时机
        // 注意：此函数只支持同步调用

        // 例如：参数中的密码是加密的，在此处进行解密
        // this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
        // 例如：插入一个中间件到框架的 coreMiddleware 之间
        // const statusIdx = app.config.coreMiddleware.indexOf('status');
        // app.config.coreMiddleware.splice(statusIdx + 1, 0, 'limit');
    }

    // 配置文件加载完成
    configDidLoad() {
        // Config, plugin files have been loaded.
    }
    
    // 文件加载完成
    async didLoad() {
        // 所有的配置已经加载完毕
        // 可以用来加载应用自定义的文件，启动自定义的服务
        this.app.myName = "热恋的安妮"
        // 例如：创建自定义应用的示例
        // this.app.queue = new Queue(this.app.config.queue);
        // await this.app.queue.init();

        // 例如：加载自定义的目录
        // app.loader.loadToContext(path.join(__dirname, 'app/tasks'), 'tasks', {
        // fieldClass: 'tasksClasses',
        // });
    }

    // 插件启动完毕
    async willReady() {
        // 所有的插件都已启动完毕，但是应用整体还未 ready
        // 可以做一些数据初始化等操作，这些操作成功才会启动应用
        await this.app.runSchedule('update_cache');
        // 例如：从数据库加载数据到内存缓存
        // this.app.cacheData = await app.model.query(QUERY_CACHE_SQL);
    }

    // worker 准备就绪
    async didReady() {
        // 应用已经启动完毕

        // this.app.myName = "热恋的安妮"
        // const ctx = await this.app.createAnonymousContext();
        // await ctx.service.Biz.request();
    }

    // 应用启动完成
    async serverDidReady() {
        // http / https server 已启动，开始接受外部请求
        // 此时可以从 app.server 拿到 server 的实例

        // app.server.on('timeout', socket => {
        // handle socket timeout
        // });
    }

    // 应用即将关闭
    async beforeClose() {
        // Do some thing before app close.
    }
}

module.exports = AppBootHook;