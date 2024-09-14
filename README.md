# Login Game（仮）

## 概要

ログイン機能を複雑化することによって、ログインするまでの時間を競うゲーム

## セットアップ

### Nodeのインストール

[Node.js公式サイト](https://nodejs.org/en) を参考にインストールする

```bash
# installs fnm (Fast Node Manager)
winget install Schniz.fnm

# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression

# download and install Node.js
fnm use --install-if-missing 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.17.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

### プロジェクトの起動

```bash
# プロジェクトをローカルにクローン
git clone https://github.com/momoyama-tech/login-game.git

# リポジトリへ移動
cd login-game

# パッケージのインストール
npm install

# プロジェクトの起動
npm run dev
```

## デザイン

[Figma](https://www.figma.com/design/KVq1nP0XZbYc63VxxBkIsm/%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%82%B2%E3%83%BC%E3%83%A0?t=YTiKV2jlIxMlXWeX-1)
