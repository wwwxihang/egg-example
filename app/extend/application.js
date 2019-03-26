/**
 * 一般来说属性的计算只需要进行一次，那么一定要实现缓存，否则在多次访问属性时会计算多次，这样会降低应用性能。
 * 推荐的方式是使用 Symbol + Getter 的模式。
 * 例如，增加一个 app.bar 属性 Getter：
 */
const BAR = Symbol('Application#bar');

module.exports = {
    foo(param) {
        // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    },
    get bar() {
        // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
        if (!this[BAR]) {
            // 实际情况肯定更复杂
            this[BAR] = this.config.xx + this.config.yy;
        }
        return this[BAR];
    },
};