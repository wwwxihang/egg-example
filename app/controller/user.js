'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        // this.ctx.body = this.app.cache.get(this.ctx.query.id);
        this.ctx.logger.info(this.ctx.app.myName)
        this.ctx.body = this.ctx.helper.formatUser(this.ctx.app.myName);
    }
    async fetch() {
        this.ctx.response.body = this.ctx.params;
    }
}

module.exports = UserController;
