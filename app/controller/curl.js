'use strict';

const Controller = require('egg').Controller;

const FormStream = require('formstream');

class CurlController extends Controller {
    async index() {
        const ctx = this.ctx;

        // 示例：请求一个 npm 模块信息
        const result = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
            // 自动解析 JSON response
            dataType: 'json',
            // 3 秒超时
            timeout: 3000,
        });

        ctx.body = {
            status: result.status,
            headers: result.headers,
            package: result.data,
        };
    }
    // 读取数据几乎都是使用 GET 请求，它是 HTTP 世界最常见的一种，也是最广泛的一种，它的请求参数也是最容易构造的。
    async get() {
        const ctx = this.ctx;
        const result = await ctx.curl('https://httpbin.org/get?foo=bar', {
            // dataType: 'json'
        });
        ctx.status = result.status;
        ctx.set(result.headers);
        ctx.body = result.data;
    }
    // 创建数据的场景一般来说都会使用 POST 请求，它相对于 GET 来说多了请求 body 这个参数。
    async post() {
        const ctx = this.ctx;
        const result = await ctx.curl('https://httpbin.org/post', {
            // 必须指定 method
            method: 'POST',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            data: {
                hello: 'world',
                now: Date.now(),
            },
            // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            dataType: 'json',
        });
        ctx.body = result.data;
    }
    // PUT 与 POST 类似，它更加适合更新数据和替换数据的语义。 除了 method 参数需要设置为 PUT，其他参数几乎跟 POST 一模一样。
    async put() {
        const ctx = this.ctx;
        const result = await ctx.curl('https://httpbin.org/put', {
            // 必须指定 method
            method: 'PUT',
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: 'json',
            data: {
                update: 'foo bar',
            },
            // 明确告诉 HttpClient 以 JSON 格式处理响应 body
            dataType: 'json',
        });
        ctx.body = result.data;
    }
    // 删除数据会选择 DELETE 请求，它通常可以不需要加请求 body，但是 HttpClient 不会限制。
    async del() {
        const ctx = this.ctx;
        const result = await ctx.curl('https://httpbin.org/delete', {
            // 必须指定 method
            method: 'DELETE',
            // 明确告诉 HttpClient 以 JSON 格式处理响应 body
            dataType: 'json',
        });
        ctx.body = result.data;
    }
    // Form
    async submit() {
        const ctx = this.ctx;
        const result = await ctx.curl('https://httpbin.org/post', {
            // 必须指定 method，支持 POST，PUT 和 DELETE
            method: 'POST',
            // 不需要设置 contentType，HttpClient 会默认以 application/x-www-form-urlencoded 格式发送请求
            data: {
                now: Date.now(),
                foo: 'bar',
            },
            // 明确告诉 HttpClient 以 JSON 格式处理响应 body
            dataType: 'json',
        });
        ctx.body = result.data.form;
        // 响应最终会是类似以下的结果：
        // {
        //   "foo": "bar",
        //   "now": "1483864184348"
        // }
    }
    // 以 Multipart 方式上传文件
    async upload() {
        const ctx = this.ctx;
        const form = new FormStream();
        // 设置普通的 key value
        form.field('foo', 'bar');
        // 上传当前文件本身用于测试
        form.file('file', __filename);

        const result = await ctx.curl('https://httpbin.org/post', {
            // 必须指定 method，支持 POST，PUT
            method: 'POST',
            // 生成符合 multipart/form-data 要求的请求 headers
            headers: form.headers(),
            // 以 stream 模式提交
            stream: form,
            // 明确告诉 HttpClient 以 JSON 格式处理响应 body
            dataType: 'json',
        });
        ctx.body = result.data.files;
        // 响应最终会是类似以下的结果：
        // {
        //   "file": "'use strict';\n\nconst For...."
        // }
    }
    // options
    async options() {

        const result = await ctx.curl('https://httpbin.org/post', {
            // 需要发送的请求数据，根据 method 自动选择正确的数据处理方式。
            data: Object,
            // 如果设置了 dataAsQueryString=true，那么即使在 POST 情况下， 
            // 也会强制将 options.data 以 querystring.stringify 处理之后拼接到 url 的 query 参数上。
            dataAsQueryString: Boolean,
            // 发送请求正文，如果设置了此参数，那么会直接忽略 data 参数。
            content: String|Buffer,
            // 设置发送请求正文的可读数据流，默认是 null。 一旦设置了此参数，HttpClient 将会忽略 data 和 content。
            stream: ReadStream,
            // 设置接受响应数据的可写数据流，默认是 null。 
            writeStream: WriteStream,
            // 是否等待 writeStream 完全写完才算响应全部接收完毕，默认是 true。
            consumeWriteStream: Boolean,
            // 设置请求方法，默认是 GET。 支持 GET、POST、PUT、DELETE、PATCH 等所有 HTTP 方法。
            method: String,
            // 设置请求数据格式，默认是 undefined，HttpClient 会自动根据 data 和 content 参数自动设置。 
            contentType: String,
            // 设置响应数据格式，默认不对响应数据做任何处理，直接返回原始的 buffer 格式数据。 支持 text 和 json 两种格式。
            dataType: String,
            // 是否自动过滤响应数据中的特殊控制字符 (U+0000 ~ U+001F)，默认是 false。 
            fixJSONCtlChars: Boolean,
            // 自定义请求头。
            headers: Object,
            // 请求超时时间，默认是 [ 5000, 5000 ]，即创建连接超时是 5 秒，接收响应超时是 5 秒。
            timeout: Number|Array,
            // 允许通过此参数覆盖默认的 HttpAgent，如果你不想开启 KeepAlive，可以设置此参数为 false。
            agent: HttpAgent,
            // 允许通过此参数覆盖默认的 HttpsAgent，如果你不想开启 KeepAlive，可以设置此参数为 false。
            httpsAgent: HttpsAgent,
            // 简单登录授权（Basic Authentication）参数，将以明文方式将登录信息以 Authorization 请求头发送出去。
            auth: String,
            // 摘要登录授权（Digest Authentication）参数，
            digestAuth: String,
            // 是否自动跟进 3xx 的跳转响应，默认是 false。
            followRedirect: Boolean,
            // 设置最大自动跳转次数，避免循环跳转无法终止，默认是 10 次。 
            maxRedirects: Number,
            // 允许我们通过 formatRedirectUrl 自定义实现 302、301 等跳转 url 拼接， 默认是 url.resolve(from, to)。
            formatRedirectUrl: Function(from, to),
            // HttpClient 在请求正式发送之前，会尝试调用 beforeRequest 钩子，允许我们在这里对请求参数做最后一次修改。
            beforeRequest: Function(options),
            // 是否直接返回响应流，默认为 false。 
            streaming: Boolean,
            // 是否支持 gzip 响应格式，默认为 false。
            gzip: Boolean,
            // 是否开启请求各阶段的时间测量，默认为 false。
            timing: Boolean,

            // ca，rejectUnauthorized，pfx，key，cert，passphrase，ciphers，secureProtocol
            // 这几个都是透传给 HTTPS 模块的参数，具体请查看 https.request(options, callback)。
        });
        
        ctx.body = result.data.files;
    }
}

module.exports = CurlController;


