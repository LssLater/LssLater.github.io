import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({
  // "/tools/": [{
  //         text: "Java",
  //         icon: "java",
  //         prefix: "java/",
  //         collapsable: false,
  //         children: ["jadx"]
  //     },
  //     {
  //         text: "Database",
  //         icon: "database",
  //         prefix: "database/",
  //         collapsable: false,
  //         children: ["chiner", "dbeaver", "screw", "datagrip"]
  //     },
  //     {
  //         text: "Docker",
  //         icon: "docker1",
  //         prefix: "docker/",
  //         collapsable: false,
  //         children: ["docker-intro", "docker-in-action"]
  //     },
  // ],
  "/note/": [
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
    // {
    //     text: "Database",
    //     icon: "database",
    //     prefix: "database/",
    //     children: ["chiner", "dbeaver", "screw", "datagrip"]
    // },
    // {
    //     text: "Git",
    //     icon: "git",
    //     prefix: "git/",
    //     collapsable: false,
    //     children: ["git-intro", "github-tips"]
    // },
    // {
    //     text: "Docker",
    //     icon: "docker1",
    //     prefix: "docker/",
    //     collapsable: false,
    //     children: ["docker-intro", "docker-in-action"]
    // },
  ],
  // 必须放在最后面
  "/": [
    {
      text: "Java",
      icon: "java",
      prefix: "java/",
      collapsable: true,
      children: [
        {
          text: "基础",
          prefix: "basis/",
          icon: "basic",
          collapsable: true,
          children: [
            "java-basic-questions-01",
            "java-basic-questions-02",
            "java-basic-questions-03",
            {
              text: "重要知识点",
              icon: "important",
              collapsable: true,
              children: [
                "why-there-only-value-passing-in-java",
                "reflection",
                "proxy",
                "io",
                "bigdecimal",
              ],
            },
          ],
        },
        {
          text: "容器",
          prefix: "collection/",
          icon: "container",
          collapsable: true,
          children: [
            "java-collection-questions-01",
            "java-collection-questions-02",
            "java-collection-precautions-for-use",
            {
              text: "源码分析",
              collapsable: true,
              children: [
                "arraylist-source-code",
                "hashmap-source-code",
                "concurrent-hash-map-source-code",
              ],
            },
          ],
        },
        {
          text: "并发编程",
          prefix: "concurrent/",
          icon: "et-performance",
          collapsable: true,
          children: [
            "java-concurrent-questions-01",
            "java-concurrent-questions-02",
            {
              text: "重要知识点",
              icon: "important",
              collapsable: true,
              children: [
                "java-thread-pool-summary",
                "java-thread-pool-best-practices",
                "java-concurrent-collections",
                "aqs",
                "reentrantlock",
                "atomic-classes",
                "threadlocal",
                "completablefuture-intro",
              ],
            },
          ],
        },
        {
          text: "JVM",
          prefix: "jvm/",
          icon: "virtual_machine",
          collapsable: true,
          children: [
            "memory-area",
            "jvm-garbage-collection",
            "class-file-structure",
            "class-loading-process",
            "classloader",
            "jvm-parameters-intro",
            "jvm-intro",
            "jdk-monitoring-and-troubleshooting-tools",
          ],
        },
        {
          text: "新特性",
          prefix: "new-features/",
          icon: "features",
          collapsable: true,
          children: [
            "java8-common-new-features",
            "java8-tutorial-translate",
            "java9",
            "java10",
            "java11",
            "java12-13",
            "java14-15",
          ],
        },
      ],
    },
  ],
});
