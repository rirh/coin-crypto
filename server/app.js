const pako = require('pako')
const axios = require('axios')

const WebSocket = require('ws')

// url
const ws = new WebSocket('wss://real.okex.com:8443/ws/v3')

ws.onopen = function open() {
    ws.send('{"channel":"ok_sub_futureusd_btc_depth_quarter","event":"addChannel"}')
}
ws.onmessage = function incoming(data) {
    console.log(1);

    if (data instanceof String) {
        console.log(data)
    } else {

        try {
            console.log(pako.inflateRaw(data, { to: 'string' }))
        } catch (err) {
            console.log(err)
        }
    }
}
axios('https://api-aws.huobi.pro/market/history/kline?symbol=btcusdt&period=1min&size=200').then(e => console.log(e));

