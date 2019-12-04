import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';

const Router = DefaultRouter;

const routes = [
  {
    name: '首页',
    path: '/',
    component: require('../../layouts/index').default,
    routes: [
      {
        name: '首页',
        path: '/',
        component: require('../index').default,
        exact: true,
        _title: 'umi-front',
        _title_default: 'umi-front',
      },
      {
        name: '用户',
        path: '/user',
        component: require('../user').default,
        exact: true,
        _title: 'umi-front',
        _title_default: 'umi-front',
      },
      {
        name: '栏目一',
        path: '/item1',
        component: require('../item1').default,
        exact: true,
        _title: 'umi-front',
        _title_default: 'umi-front',
      },
      {
        name: '栏目二',
        path: '/item2',
        component: require('../item2').default,
        exact: true,
        _title: 'umi-front',
        _title_default: 'umi-front',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/zh/Documents/web/react/coin-crypto/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'umi-front',
        _title_default: 'umi-front',
      },
    ],
    _title: 'umi-front',
    _title_default: 'umi-front',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/zh/Documents/web/react/coin-crypto/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: 'umi-front',
    _title_default: 'umi-front',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
