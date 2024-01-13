import { hopeTheme } from "vuepress-theme-hope";
import { navbarConfig } from "./navbar";
import { sidebarConfig } from "./sidebar";

export default hopeTheme({
  hostname: "https://afterward.top",

  author: {
    name: "Mr.Lss",
    url: "https://afterward.top",
  },

  fullscreen: true,
  // themeColor: {
  //   blue: "#087CFA",
  //   red: "#FE2857",
  //   green: "#21D789",
  //   orange: "#FC801D",
  //   pink: "#FF318C",
  //   lightBlue: "#07C3F2",
  // },
  iconAssets: "iconfont",
  //iconPrefix: "iconfont icon-",

  logo: "/logo.svg",

  repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "docs",
  // navbar
  navbar: navbarConfig,

  // sidebar
  sidebar: sidebarConfig,

  footer: "测试用网站",

  displayFooter: true,

  pageInfo: [
    "Author",
    "Original",
    "Date",
    "Category",
    "Tag",
    "Word",
    "ReadingTime",
  ],

  blog: {
    description: "热爱全栈开发的后端开发者",
    intro: "/intro.html",
    medias: {
      Email: "https://example.com",
      GitHub: "https://example.com",
      QQ: "https://example.com",
      Wechat: "https://example.com",
      Youtube: "https://example.com",
      Zhihu: "https://example.com",
    },
  },

  // encrypt: {
  //   config: {
  //     "/guide/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {
    docsearch: {
      appId: "BT7ZL9SBM6",
      apiKey: "03119caa84da09a742740d4104b6a5dc",
      indexName: "afterward",
      // locales: {
      //   "/": {
      //     placeholder: "搜索",
      //     translations: {
      //       button: {
      //         buttonText: "搜索",
      //         buttonAriaLabel: "搜索",
      //       },
      //       modal: {
      //         searchBox: {
      //           resetButtonTitle: "清除查询条件",
      //           resetButtonAriaLabel: "清除查询条件",
      //           cancelButtonText: "取消",
      //           cancelButtonAriaLabel: "取消",
      //         },
      //         startScreen: {
      //           recentSearchesTitle: "搜索历史",
      //           noRecentSearchesText: "没有搜索历史",
      //           saveRecentSearchButtonTitle: "保存至搜索历史",
      //           removeRecentSearchButtonTitle: "从搜索历史中移除",
      //           favoriteSearchesTitle: "收藏",
      //           removeFavoriteSearchButtonTitle: "从收藏中移除",
      //         },
      //         errorScreen: {
      //           titleText: "无法获取结果",
      //           helpText: "你可能需要检查你的网络连接",
      //         },
      //         footer: {
      //           selectText: "选择",
      //           navigateText: "切换",
      //           closeText: "关闭",
      //           searchByText: "搜索提供者",
      //         },
      //         noResultsScreen: {
      //           noResultsText: "无法找到相关结果",
      //           suggestedQueryText: "你可以尝试查询",
      //           reportMissingResultsText: "你认为该查询应该有结果？",
      //           reportMissingResultsLinkText: "点击反馈",
      //         },
      //       },
      //     },
      //   },
      // },
    },
    blog: {
      excerptLength: 0,
    },

    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-test-rouge.vercel.app/",
    // },

    feed: {
      atom: true,
      json: true,
      rss: true,
    },

    mdEnhance: {
      align: true,
      codetabs: true,
      demo: true,
      flowchart: true,
      footnote: true,
      imgMark: true,
      katex: true,
      mermaid: true,
      revealJs: true,
      sub: true,
      sup: true,
      vPre: true,
    },

    pwa: {
      favicon: "/favicon.ico",
      themeColor: "#5c92d1",
      cacheHTML: false,
      maxSize: 3072,
      apple: {
        icon: "/assets/icon/apple-touch-icon.png",
        statusBarColor: "white",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        name: "Mr.Hope 的个人博客",
        short_name: "Mr.Hope Blog",
        description: "Mr.Hope 的个人博客",
        theme_color: "#5c92d1",
        icons: [
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "分类",
            short_name: "分类",
            icons: [
              {
                src: "/assets/icon/category-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/category-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
            url: "/category/",
            description: "文章分类分组",
          },
          {
            name: "标签",
            short_name: "标签",
            icons: [
              {
                src: "/assets/icon/tag-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/tag-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
            url: "/tag/",
            description: "文章标签分组",
          },
          {
            name: "时间线",
            short_name: "时间线",
            icons: [
              {
                src: "/assets/icon/timeline-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/timeline-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
            url: "/timeline/",
            description: "时间线文章列表",
          },
          {
            name: "个人介绍",
            short_name: "个人介绍",
            icons: [
              {
                src: "/assets/icon/about-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/about-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
            url: "/about/",
            description: "个人介绍",
          },
        ],
      },
    },
  },
});
