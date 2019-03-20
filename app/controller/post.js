// const Controller = require('../core/base_controller');

const Controller = require('egg').Controller;

class PostController extends Controller {
    async create() {
        const { ctx, service } = this;
        const createRule = {
            title: { type: 'string' },
            content: { type: 'string' },
        };
        // 校验参数
        ctx.validate(createRule);
        // 组装参数
        const author = ctx.session.userId;
        const req = Object.assign(ctx.request.body, { author });
        // 调用 Service 进行业务处理
        const res = await service.post.create(req);
        // 设置响应内容和响应状态码
        ctx.body = { id: res.id };
        ctx.status = 201;
    }
    async list() {
        const posts = await this.service.listByUser(this.user);
        this.success(posts);
    }
    async test() {

        const { ctx, service } = this;
        const createRule = {
            title: { type: 'string' }
        };
        console.log(ctx)
        // 校验参数
        ctx.validate(createRule);
        // 组装参数
        const author = ctx.session.userId;
        const req = Object.assign(ctx.request.body, { author });
        // 调用 Service 进行业务处理
        const res = await service.post.create(req);
        // 设置响应内容和响应状态码
        ctx.body = { id: 123 };
        ctx.status = 201;
    }
    async listPostsGet() {
        console.log(this.ctx.queries);

        this.ctx.body = this.ctx.queries
        // {
        //   category: [ 'egg' ],
        //   id: [ '1', '2', '3' ],
        // }
    }
    async listPostsPost() {
        this.ctx.body = this.ctx.request.body
        // assert.equal(this.ctx.request.body.title, 'controller');
        // assert.equal(this.ctx.request.body.content, 'what is controller');
    }
}
module.exports = PostController;