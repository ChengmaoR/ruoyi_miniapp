export default {
  pages: [
    'pages/index/index',
    'pages/center/index',
    'pages/login/index',
    'pages/show/index',
  ],
  window: {
    // backgroundTextStyle: 'light',
    // navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: 'WeChat',
    // navigationBarTextStyle: 'black',
    navigationStyle: "custom"
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#000000',
    backgroundColor: '#000000',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/center/index',
        text: '我的',
      },
    ],
  },
  // "subPackages": [
  //   {
  //     "root": "pages/show/",
  //     "pages": [
  //       "show/index",
  //       "login/index",
  //     ]
  //   },
  // ],
  usingComponents: {},
}
