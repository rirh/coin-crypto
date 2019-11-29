import config from '../../config';
import axios from '@/lib/axios';
import crypto from 'crypto-js'
// import enc from 'crypto-js/enc-base64'
const url = config.huobi.url;
const ws = config.huobi.ws;
console.log(crypto);



const encode = params => {
    let result = '';
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const element = params[key];
            result += `${element}\n`
        }
    }
    return result;
}
const decode = params => {
    let result = '';
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const element = params[key];
            result += `${key}=${element}&`
        }
    }
    result = result.substring(0, result.length - 1);
    return result;
}

function sort_ASCII(obj) {
    var arr = new Array();
    var num = 0;
    for (var i in obj) {
        arr[num] = i;
        num++;
    }
    var sortArr = arr.sort();
    var sortObj = {};
    for (let i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]];
    }
    return sortObj;
}

export default async params => {

    params.data = {
        ...params.data,
        AccessKeyId: config.huobi.AK,
        SignatureMethod: 'HmacSHA256',
        SignatureVersion: 2,
        Timestamp: new Date(),
    }
    params.method = "POST";
    params.url = `${url}${params.url}`;
    const data = decode(sort_ASCII(params.data));
    // console.log(crypto);
    // const HmacSHA256 = require('crypto-js/hmac-sha256')
    // const enc = require('crypto-js/hmac-sha256')
    const hash = crypto.HmacSHA256(data, config.huobi.SK);
    const hash_base64 = crypto.enc.Base64.stringify(hash);
    console.log(`加密成功:${hash_base64}`);
    
    params.data.Signature = hash_base64;
    params.Signature = {
        method: 'POST',
        url: url.split('//')[1],
        path: params.url,
        params: params.data,
        data: params.data,
    }
    const Signature = encode(params.Signature)
    params.Signature =Signature;
    console.log(params);

    const res = await axios(params);

}