'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        // this.ctx.body = this.app.cache.get(this.ctx.query.id);
        this.ctx.body = this.ctx.app.myName;
    }
    async fetch() {
        this.ctx.response.body = this.ctx.router;
    }
}

module.exports = UserController;
