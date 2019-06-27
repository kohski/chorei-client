# chorei-client
> chorei app client
## バージョン情報
  - フロントエンド
    - nuxt.js 2.8.0
    - vuetify 1.5.14
    - vuex 3.1.1
  - サーバーサイド
    - Ruby 2.5.1
    - Ruby on Rails 5.2.3(apiモード)
  - データベース
    - Postgresql 11.3
  - インフラ
    - AWS EC2
    - AWS
## カタログ設計
  https://docs.google.com/spreadsheets/d/1kOSbXO4jHK-TYGTf6gsSmkT7xgGZp_YIDJKNxBkOYkM/edit#gid=0
## テーブル定義書
  https://docs.google.com/spreadsheets/d/1kOSbXO4jHK-TYGTf6gsSmkT7xgGZp_YIDJKNxBkOYkM/edit#gid=1650169235
## ER図
  https://docs.google.com/spreadsheets/d/1kOSbXO4jHK-TYGTf6gsSmkT7xgGZp_YIDJKNxBkOYkM/edit#gid=1931486568
## 画面遷移図 & ワイヤーフレーム
  https://docs.google.com/spreadsheets/d/1kOSbXO4jHK-TYGTf6gsSmkT7xgGZp_YIDJKNxBkOYkM/edit#gid=106684134
## 使用予定Gem
  - devise
  - devise_token_auth
  - rswag
  - json2yaml

## Build Setup
``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
