/**
 * 框架会把 app/extend/context.js 中定义的对象与 Koa Context 的 prototype 对象进行合并，
 * 在处理请求时会基于扩展后的 prototype 生成 ctx 对象。
 */

module.exports = {
    foo(param) {
        // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    },
};