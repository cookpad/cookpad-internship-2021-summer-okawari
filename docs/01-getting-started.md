# Getting Started

フロントエンドとなる minimart-web (Next.js) と、GraphQL API サーバーとなる minimart-api (Rails) をそれぞれ準備していきます。

## 課題リポジトリの fork

https://github.com/cookpad/cookpad-internship-2021-summer-okawari のリポジトリを自身の GitHub アカウントへ fork してください。
この後紹介していく基本課題や応用課題の成果を最終的に PullRequest として提出していただきます。

## 開発用インスタンスへの ssh 接続

今回はクックパッドが用意した EC2 インスタンス上で開発を進めていただきます。
事前にアンケートでお応えいただいた GitHub アカウントに登録されている鍵で ssh 接続可能なインスタンスを用意しました。
以下の接続先設定をお手元の `~/.ssh/config`（windowns の場合は `C:\Users\ユーザー名\.ssh\config` ）に追加してください。

```
Host summer-internship-cookpad
  User ubuntu
  HostName <IP_ADDRESS>
  Port 22
  ForwardAgent yes
  LocalForward 3001 127.0.0.1:3001
  LocalForward 3000 127.0.0.1:3000
  LogLevel FATAL
  ServerAliveInterval 30
  ServerAliveCountMax 4
```

`ForwardAgent` は必要に応じて設定してください。ssh 先のインスタンスで手元の秘密鍵を参照できるようになります。
最後に課題の成果を GitHub へ Push するため、EC2 環境上に新たに秘密鍵を作らない場合は設定を入れてください。

EC2 環境は ubuntu 20.04 をベースで基本的な環境が構築されています。
各々必要なパッケージやライブラリは適宜インストールしていただいて構いません。

### Troubleshooting

接続ができない場合、以下を順番に確認してください。

- 配布された EC2 へ接続する IP Address が正しいか
- GitHub に公開鍵を登録しており、 https://github.com/<YOUR_USER_NAME>.keys からその公開鍵が確認できるか
- それらの一つに対応する正しい秘密鍵を使っているか
- それでも駄目なら講師か TA に相談してください

## 開発環境

以下の３つの開発環境からお好きな環境を選んで開発してください。
おすすめは最初の VSCode Remote を使った開発環境です。

### 1. VSCode Remote を使った接続

vscode を使用する場合、ssh の設定まで完了したら VSCode Remote の extension を使って開発環境へ接続することができます。
以下の extension を手元の vscode に install し、画面左に表示される `Remote Exproler` タブから `summer-internship-cookpad` へ接続してください。

- [Remote Development - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

VSCode Remote を使う場合、ローカルに入っている extension はサーバー側で再度インストールする必要があります。
`Extension` からサーバー上へ必要な extension をインストールしてください。

### 2. code-server での接続

[cdr/code-server: VS Code in the browser](https://github.com/cdr/code-server) を使って接続することもできます。
http://<IP_ADDRESS>:8080 で環境にアクセスしてください。code-server のログインパスワードは `Summ3r1nt3rnSh1p%0k4w4r1` です。

### 3. ssh 先のインスタンスをそのまま使う

CUI での開発がお好きな方は接続先の EC2 へをカスタマイズして使ってください。

## Git ユーザーの設定

課題を commit するために git のユーザーを先に設定しておきましょう。

```console
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
```

## fork したリポジトリの clone

開発環境の EC2 に接続までできたら、最初に fork したリポジトリを開発環境へ clone してきましょう。
ssh を使って clone する場合、`ForwardAgent` の設定を追加しているか、EC2 上に作成した秘密鍵に対応する公開鍵が GitHub に登録されている必要があります。

```console
$ cd ~ && git clone git@github.com:<YOUR_USERNAME>/cookpad-internship-2021-summer-okawari.git minimart
```

## minimart-web (Next.js) の準備

ターミナルを開いて、minimart-web ディレクトリに移動します。
Node.js のパッケージマネージャーである yarn を使い、必要なパッケージをインストールしましょう。

```console
$ cd minimart-web
$ yarn install
```

`✨ Done in 0.24s.` のように表示されたら成功です。

インストールが完了したら、Next.js サーバーを起動してみます。

```console
$ yarn dev
```

次のようなログが表示されたら成功です。

```console
$ yarn dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /Users/daisuke-aritomo/Development/intan-n/minimart-okawari/minimart-web/.env
info  - Using webpack 5. Reason: Enabled by default https://nextjs.org/docs/messages/webpack5
event - compiled successfully
```

## minimart-api (Rails) の準備

minimart-web の準備が完了したら、次は minimart-api の準備です。

新しいターミナルの画面を開き、setup スクリプトを実行しましょう。

```
$ cd minimart-api
$ ./bin/setup
```

それでは Rails を起動しましょう。
Rails はデフォルトではポート 3000 で起動しますが、これでは先ほど起動した Next.js サーバーと衝突してしまうので、ポート 3001 を指定します。

```
$ bundle exec rails server -b 0.0.0.0 -p 3001
```

## ブラウザで動作確認

ブラウザで http://localhost:3000/ (Next.js サーバー) にアクセスしてみます。
以下のような画面が表示されたら成功です。

## Happy Hacking!

さっそく開発をしていきましょう！
公式ドキュメントや、デバッグ用の小技は [Tips](tips.md) にまとめてありますので、参考にしてください。
