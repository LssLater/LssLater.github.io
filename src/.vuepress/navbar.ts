import { navbar } from "vuepress-theme-hope";

export const navbarConfig = navbar([
  // "/",
  // "/home",
  { text: "面试指南", icon: "java", link: "/java/" },
  { text: "优质专栏", icon: "stack", link: "/note/" },
  { text: "书籍推荐", icon: "read", link: "/books/cs-basics/" },
  { text: "项目精选", icon: "github", link: "/open-source-project/" },
  // {
  //   text: "旧版链接",
  //   icon: "java",
  //   link: "https://snailclimb.gitee.io/javaguide/#/",
  // },
  // { text: "RSS订阅", icon: "rss", link: "https://javaguide.cn/feed.json" },
  { text: "关于作者", icon: "profile", link: "/about-the-author/" },
]);
