// ref: https://umijs.org/config/
import config from './config';

export default {
  treeShaking: true,
  routes: [
    {
      name: '首页',
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          name: '首页',
          path: '/',
          component: '../pages/index',
        },
        {
          name: '用户',
          path: '/user',
          component: './user',
        },
        {
          name: '栏目一',
          path: '/item1',
          component: './item1',
        },
        {
          name: '栏目二',
          path: '/item2',
          component: './item2',
        },

      ],
    },
  ],

  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: false,
        title: 'umi-front',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
