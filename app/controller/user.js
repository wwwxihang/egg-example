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
        const userName = ctx.query.userName;
        // ctx.validate(createRule);
        const result = await ctx.service.user.add({
            userName
        });
        ctx.body = result;
    }
    async update() {
        const { ctx } = this;
        const userName = ctx.query.userName;
        const userId = ctx.query.userId;
        // ctx.validate(createRule);
        const result = await ctx.service.user.update({
            userName,
            userId
        });
        ctx.body = result;
    }
}

module.exports = UserController;
