'use strict';

exports.index = async ctx => {
    const type = ctx.query.type;
    const q = ctx.query.q || 'nodejs';

    // ctx.body = ctx.query;
    if (type === 'baidu') {
        ctx.redirect(`https://www.baidu.com?q=${q}`);
    } else {
        ctx.redirect(`https://www.google.co.kr?q=${q}`);
    }
};