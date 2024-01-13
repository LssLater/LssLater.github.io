import { arraySidebar } from "vuepress-theme-hope";

export const note = arraySidebar([
  "",
  {
    text: "漫画算法",
    prefix: "suanfa/manhua/",
    children: ["xiaohui"],
  },
  {
    text: "leetcode",
    prefix: "suanfa/leetcode/",
    children: ["meiriyiti", "shujujiegou"],
  },
  {
    text: "牛客sql笔记",
    children: ["sql/"],
  },
]);
