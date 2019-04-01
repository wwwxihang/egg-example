const Service = require('egg').Service;
class UserService extends Service {
    // 默认不需要提供构造函数。
    constructor(ctx) {
        super(ctx);
        //   如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
        // 就可以直接通过 this.ctx 获取 ctx 了
        // 还可以直接通过 this.app 获取 app 了
    }
    // 用户详情
    async info(uid) {

        const user = await this.app.mysql.query('select * from user where user_id = ?', uid * 1);

        return user
    }
    // 添加
    async add(obj = {}) {
        let result = false
        if (obj.userName) {
            result = await this.app.mysql.insert('user', {
                user_name: obj.userName
            });
        }

        return result;
    }
    // 列表
    async list(obj = {}) {
        const result = await this.app.mysql.select('user', {
            // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
            // columns: ['author', 'title'], // 要查询的表字段
            // orders: [['created_at', 'desc'], ['id', 'desc']], // 排序方式
            limit: obj.pageSize * 1 || null, // 返回数据量
            offset: 0
        });

        return result;
    }
    // 更新
    async update(obj = {}) {

        // 如果主键是自定义的 ID 名称，如 custom_id，则需要在 `where` 里面配置
        const row = {
            user_name: obj.userName
        };

        const options = {
            where: {
                user_id: obj.userId
            }
        };
        const result = await this.app.mysql.update('user', row, options);

        return result;
    }
}
module.exports = UserService;