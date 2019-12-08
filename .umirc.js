// ref: https://umijs.org/config/
import config from './config';
import { Tabs } from 'antd';


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
    // ["import", {
    //   "libraryName": "antd",
    //   "libraryDirectory": "es",
    //   "style": "css" // `style: true` 会加载 less 文件
    // }]
    // ['umi-plugin-mobx', {
    //   modelName: 'store', // or "stores", defaults to "store", you can set "model" like dva.
    //   exclude: [/^\$/, (filename) => filename.includes('__')]
    // }],
    // ['umi-plugin-routes', {
    //   exclude: [/stores/] // ignore **/stores/**/*.*, you can set /models/ like dva.
    // }]
  ],
};
