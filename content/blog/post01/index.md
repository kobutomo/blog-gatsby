---
title: GitHub Actions使ってみました。
date: "2019-12-08"
categories: [技術, GitHub Actions]
---

GatsbyJSに乗り換えてから初めての記事になります。  
CircleCIとかJenkinsとか、CI/CDと言われるものをほとんど触ったことなかったんですが、GatsbyJSでブログを書くにあたって**masterブランチにプッシュすると自動でビルドが走りデプロイされる**っていうような簡単なCDがほしかったので、勉強がてら触ってみました。  
今回は要件が非常に簡単だったので、入門にはもってこいなテーマだったように思います。

ちなみに、GatsbyJSは内部的にGraphQLを使っているので、**CI/CD・GraphQL**みたいな今っぽい感じのものを軽く触ってみるにはかなり良い教材だと思います。

今回書いた設定ファイルは以下のような感じです。
```yml:title=deploy.yml
name: deploy lightsail

on:
  push:
    branches:
    - master

jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@master

    - name: setup node
      uses: actions/setup-node@v1
      with:
        node-version: '10.x'
    - run: npm install
    - run: npm run build

    - name: ssh key generate
      run: echo "$SSH_KEY" > key && chmod 600 key
      env:
        SSH_KEY: ${{ secrets.SSH_KEY }}

    - name: rsync deploy
      run: rsync -acvz --delete -e "ssh -i key -o StrictHostKeyChecking=no" $GITHUB_WORKSPACE/public/ $USER@$HOST:/path/to/dir/
```
どちらかというと設定ファイルを書くよりもSSH周りの設定（プライベートキーを用意したり）の方が大変ですね。  
そのあたりは個人用のPCにubuntuが入ってるので、自分でSSH接続できるか検証しながらやれましたが、
```yml{numberLines:12}
    - uses: actions/checkout@master
```
これ忘れててハマりまくって**18回ぐらい失敗**しました。  
node_modulesのキャッシュとかもできるみたいなので今後チャレンジしていきたいです。