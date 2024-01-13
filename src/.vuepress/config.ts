import { defineUserConfig } from "vuepress";
//import docsearchPlugin from "@vuepress/plugin-docsearch";
import theme from "./theme.js";

export default defineUserConfig({
  port: 8090,
  title: "AfterWard",
  // base: "/",
  description: "AfterWard的个人知识库",
  dest: "./dist",
  // 是否开启默认预加载 js
  head: [
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "Guide" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Java基础, 多线程, JVM, 虚拟机, 数据库, MySQL, Spring, Redis, MyBatis, 系统设计, 分布式, RPC, 高可用, 高并发",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    // 添加百度统计
    [
      "script",
      {},
      `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "/iconfont/iconfont.css",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      // title: "主题演示",
      // description: "vuepress-theme-hope 的演示",
    },
  },

  theme,
  plugins: [
    // docsearch: {
    //   appId: "BT7ZL9SBM6",
    //   apiKey: "03119caa84da09a742740d4104b6a5dc",
    //   indexName: "afterward",
    //   // locales: {
    //   //   "/": {
    //   //     placeholder: "搜索",
    //   //     translations: {
    //   //       button: {
    //   //         buttonText: "搜索",
    //   //         buttonAriaLabel: "搜索",
    //   //       },
    //   //       modal: {
    //   //         searchBox: {
    //   //           resetButtonTitle: "清除查询条件",
    //   //           resetButtonAriaLabel: "清除查询条件",
    //   //           cancelButtonText: "取消",
    //   //           cancelButtonAriaLabel: "取消",
    //   //         },
    //   //         startScreen: {
    //   //           recentSearchesTitle: "搜索历史",
    //   //           noRecentSearchesText: "没有搜索历史",
    //   //           saveRecentSearchButtonTitle: "保存至搜索历史",
    //   //           removeRecentSearchButtonTitle: "从搜索历史中移除",
    //   //           favoriteSearchesTitle: "收藏",
    //   //           removeFavoriteSearchButtonTitle: "从收藏中移除",
    //   //         },
    //   //         errorScreen: {
    //   //           titleText: "无法获取结果",
    //   //           helpText: "你可能需要检查你的网络连接",
    //   //         },
    //   //         footer: {
    //   //           selectText: "选择",
    //   //           navigateText: "切换",
    //   //           closeText: "关闭",
    //   //           searchByText: "搜索提供者",
    //   //         },
    //   //         noResultsScreen: {
    //   //           noResultsText: "无法找到相关结果",
    //   //           suggestedQueryText: "你可以尝试查询",
    //   //           reportMissingResultsText: "你认为该查询应该有结果？",
    //   //           reportMissingResultsLinkText: "点击反馈",
    //   //         },
    //   //       },
    //   //     },
    //   //   },
    //   // },
    // },
  ],
  shouldPrefetch: false,
});
