'use strict';

const Controller = require('egg').Controller;

// 检查参数

class UserController extends Controller {
    async list() {
        const { ctx } = this;
        const pageSize = ctx.query.pageSize;
        const result = await ctx.service.user.list({
            pageSize
        });
        ctx.body = result;
    }
    async info() {
        const { ctx } = this;
        const userId = ctx.params.id;
        const result = await ctx.service.user.info(userId);
        ctx.body = result;
    }
    async add() {
        const { ctx } = this;
        
        const body = Object.assign(ctx.request.body);

        // ctx.validate(createRule);
        const result = await ctx.service.user.add({
            userName: body.userName
        });
        ctx.body = result;
    }
    async del() {
        const { ctx } = this;
        
        const body = Object.assign(ctx.request.body);

        // ctx.validate(createRule);
        const result = await ctx.service.user.del({
            userId: body.userId
        });
        ctx.body = result;
    }
    async update() {
        const { ctx } = this;
        const body = Object.assign(ctx.request.body);

        const userName = body.userName;
        const userId = body.userId;
        // ctx.validate(createRule);
        const result = await ctx.service.user.update({
            userName,
            userId
        });
        ctx.body = result;
    }
}

module.exports = UserController;
