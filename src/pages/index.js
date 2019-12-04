import React, { Component } from 'react';
import axios from '@/lib/huobiAxios.js';
import styles from './index.scss'

export default class index extends Component {
  state = {
    data: []
  }
  async componentDidMount() {
    const ws = new WebSocket('wss://api-aws.huobi.pro/ws');

    ws.onopen = function (evt) {
      console.log("Connection open ...");
      ws.send("Hello WebSockets!");
    };

    ws.onmessage = function (evt) {
      ws.send({ "sub": "topic to sub", "id": "id generate by client" }, s => console.log(s));

      console.log("Received Message: " + evt.data);
      ws.close();
    };

    ws.onclose = function (evt) {
      console.log("Connection closed.");
    };

    // const { data } = await axios({
    //   url: '/v1/common/symbols',
    // })
    const res = await axios({
      url: '/market/history/kline?symbol=btcusdt&period=1min&size=200',
      // url: '/v1/common/symbols',
    })
   


    // this.setState({
    //   data
    // })
  }
  render() {
    return (
      <div className={styles.wapper}>
        {(Array.isArray(this.state.data)) && (this.state.data).map(e => (
          <div key={e.symbol} className={styles.item}>
            {e.symbol.toUpperCase()}
          </div>))}
      </div>
    )
  }
}
