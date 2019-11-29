import React, { Component } from 'react';
import axios from '@/lib/axios'
import styles from './index.scss'

export default class index extends Component {
  state = {
    data: []
  }
  async componentDidMount() {
    const { data } = await axios({ url: 'https://api-aws.huobi.pro/v2/reference/currencies' })
    this.setState({
      data
    })
  }
  render() {
    return (
      <div className={styles.wapper}>
        {(this.state.data).map(e => (
          <div key={e.currency} className={styles.item}>
            {e.currency.toUpperCase()}
          </div>))}
      </div>
    )
  }
}
