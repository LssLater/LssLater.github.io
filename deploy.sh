#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run vite-build

# 进入生成的文件夹
cd dist

# deploy to github pages
# echo 'afterward.top' > CNAME

if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:LssLater/LssLater.github.io.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://LssLater:${GITHUB_TOKEN}@github.com/LssLater/LssLater.github.io.git
  git config --global user.email "528952805@qq.com"
fi
git init
git add -A
git commit -m "第一章整理完"
git push -f $githubUrl master:gh-pages # 推送到github gh-pages分支


