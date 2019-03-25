const Service = require('egg').Service;
class UserService extends Service {
    // 默认不需要提供构造函数。
    constructor(ctx) {
      super(ctx); 
    //   如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
      // 就可以直接通过 this.ctx 获取 ctx 了
      // 还可以直接通过 this.app 获取 app 了
    }
    async find(uid) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息

        const user = await this.app.mysql.query('select * from user where user_id = ?', uid * 1);

        

        // 假定这里还有一些复杂的计算，然后返回需要的信息。
        // const result = await this.getColumnByPosition();

        // console.log(result)
        // return {
        //     userId: user[0].user_id,
        //     userName: user[0].user_name,
        //     // picture,
        // };
        return user
    }

    async getColumnByPosition() {
        const result = await this.ctx.curl(`https://hapi-pre.00bang.cn/column/getColumnByPosition?position=0`, {
            method: 'GET',
            dataType: 'json',
          });
        return result.data;
    }
}
module.exports = UserService;