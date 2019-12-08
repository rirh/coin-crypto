import React, { Component } from 'react';
import axios from '@/lib/huobiAxios.js';
import styles from './index.scss'
import { Tabs, Table, Divider, Tag } from 'antd';
const { TabPane } = Tabs;

export default class index extends Component {
  state = {
    data: [],
    loading: true,
    columns: [
      {
        title: '交易对',
        dataIndex: 'symbol',
        key: 'symbol',
        align: 'center',
        render: (text, params) => (<span className={styles.border}>
          {params.symbol.toUpperCase()}
        </span>)
      },
      {
        title: '基础币种',
        dataIndex: 'base-currency',
        key: 'base-currency',
        align: 'center',
      },
      {
        title: '报价币种',
        dataIndex: 'quote-currency',
        key: 'quote-currency',
        align: 'center',
      },
      {
        title: '报价精度',
        dataIndex: 'price-precision',
        key: 'price-precision',
        align: 'center',
      },
      {
        title: '计数精度',
        dataIndex: 'amount-precision',
        key: 'amount-precision',
        align: 'center',
      },
      {
        title: '交易区',
        dataIndex: 'symbol-partition',
        key: 'symbol-partition',
        align: 'center',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        align: 'center',
      },
      {
        title: '金额精度',
        dataIndex: 'value-precision',
        key: 'value-precision',
        align: 'center',
      },
      {
        title: '最大单量',
        dataIndex: 'min-order-amt',
        key: 'min-order-amt',
        align: 'center',
      },
      {
        title: '最小金额',
        dataIndex: 'min-order-value',
        key: 'min-order-value',
        align: 'center',
      },
      {
        title: '杠杆最大倍数 ',
        dataIndex: 'leverage-ratio',
        key: 'leverage-ratio',
        align: 'center',
      },
    ]
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

    const { data } = await axios({
      url: '/v1/common/symbols',
    })
    // const res = await axios({
    //   url: '/market/history/kline?symbol=btcusdt&period=1min&size=200',
    //   // url: '/v1/common/symbols',
    // })



    this.setState({
      data
    }, () => {
      this.setState({ loading: false })
    })
  }
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <div className={styles.tab_wapper}>
        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
          <TabPane tab="Tab 1" key="1">
            <Table rowKey={1} loading={this.state.loading} columns={this.state.columns} dataSource={Array.isArray(this.state.data) && this.state.data || []} />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <div className={styles.list_wapper}>
              {(Array.isArray(this.state.data)) && (this.state.data).map(e => (
                <div key={e.symbol} className={styles.item}>
                  {e.symbol.toUpperCase()}
                </div>))}
            </div>
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
         </TabPane>
        </Tabs>

      </div>
    )
  }
}
