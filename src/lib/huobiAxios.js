/**
 * huobiapi 请求加密
 * ==================================
 *         1. 请求方法（GET 或 POST），后面添加换行符 “\n”
            GET\n
            2. 添加小写的访问地址，后面添加换行符 “\n”
            api.huobi.pro\n
            3. 访问方法的路径，后面添加换行符 “\n”
            /v1/order/orders\n
            4. 按照ASCII码的顺序对参数名进行排序。例如，下面是请求参数的原始顺序，进行过编码后
            AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx
            order-id=1234567890
            SignatureMethod=HmacSHA256
            SignatureVersion=2
            Timestamp=2017-05-11T15%3A19%3A30
            使用 UTF-8 编码，且进行了 URI 编码，十六进制字符必须大写，如 “:” 会被编码为 “%3A” ，空格被编码为 “%20”。
            时间戳（Timestamp）需要以YYYY-MM-DDThh:mm:ss格式添加并且进行 URI 编码。
            5. 经过排序之后
            AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx
            SignatureMethod=HmacSHA256
            SignatureVersion=2
            Timestamp=2017-05-11T15%3A19%3A30
            order-id=1234567890
            6. 按照以上顺序，将各参数使用字符 “&” 连接
            AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890
            7. 组成最终的要进行签名计算的字符串如下
            GET\n
            api.huobi.pro\n
            /v1/order/orders\n
            AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890
            8. 用上一步里生成的 “请求字符串” 和你的密钥 (Secret Key) 生成一个数字签名
            4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=
            将上一步得到的请求字符串和 API 私钥作为两个参数，调用HmacSHA256哈希函数来获得哈希值。
            将此哈希值用base-64编码，得到的值作为此次接口调用的数字签名。
            9. 将生成的数字签名加入到请求的路径参数里
            最终，发送到服务器的 API 请求应该为
            https://api.huobi.pro/v1/order/orders?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D
            把所有必须的认证参数添加到接口调用的路径参数里
            把数字签名在URL编码后加入到路径参数里，参数名为“Signature”。   
   ==========================================
 * 
 * 
 * 
 */
import config from '../../config.js'
//格式化时间
import moment from 'moment';
//区块加密
import crypto from 'crypto-js';
//url 格式化
import url from 'url';
//前端请求方法
import axios from '@/lib/axios'

const DEFAULT_HEADERS = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
}

function sign_sha(method, baseurl, path, data) {
    let result = "";
    const pars = [];
    for (let item in data) {
        pars.push(item + "=" + encodeURIComponent(data[item]));
    }
    // 连接& 并且按照ASCII码的顺序对参数名进行排序
    result = pars.sort().join("&");
    // 后面添加换行符 “\n”
    const meta = [method, baseurl, path, p].join('\n');
    var hash = crypto.HmacSHA256(meta, config.huobi.SK);
    var Signature = encodeURIComponent(crypto.enc.Base64.stringify(hash));
    result += `&Signature=${Signature}`;
    return result
}
function get_body() {
    return {
        AccessKeyId: config.huobi.AK,
        SignatureMethod: "HmacSHA256",
        SignatureVersion: 2,
        // 格式化时间
        Timestamp: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
    };
}
export default params => {
    //请求
    let { method, url, data } = params;
    url = `${config.huobi.url}${url}`;
    params.url = url;
    if (method) {
        const host = url.parse(path).host;
        const cpath = url.parse(path).path;
        var body = Object.assign(get_body(), data);
        var payload = sign_sha(method, host, cpath, body);
        params.body = body;
        params.url = `${params.url}?${payload}`;
    }
    // if (!params.header) params.header = DEFAULT_HEADERS;
    return axios(params);
}
