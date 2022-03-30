import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  port: 8090,
  title: "AfterWard",
  // base: "/",
  description: "AfterWard的个人知识库",
  dest: "./dist",
  // 是否开启默认预加载 js
  shouldPrefetch: (file, type) => false,
  head: [
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
        href: "//at.alicdn.com/t/font_2922463_99aa80ii7cf.css",
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

  themeConfig,
});
