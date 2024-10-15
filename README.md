# nuxt3-protobuf-project-template

このリポジトリは、[Vue Fes Japan 2024](https://vuefes.jp/2024)で発表した「Protocol BuffersとNuxt3で開発生産性を上げるためのスキーマファースト開発の紹介」のLTのためのデモプロジェクトです。  
プレゼンテーションで紹介したスキーマファースト開発の雰囲気を掴むことができるように作成しています。

> [!NOTE]  
> このプロジェクトは、基本的な機能は実装済みですが、1機能だけ未実装未で留めています。
> もし興味がある方は、続きの作業をやりきって、スキーマファースト開発の流れを実際に試してみて下さい。

## アプリケーションの概要

このプロジェクトは、フロントエンドとバックエンドの２つのアプリケーションで構成されます。
アプリケーションはToDoリストを管理することができ、バックエンドアプリケーションはToDoリストのデータを保持し、フロントエンドアプリケーションにAPIとしてデータ提供をします。  
フロントエンドアプリケーションはバックエンドアプリケーションから提供されるAPIを使ってToDoリストのUIを提供します。

> [!NOTE]  
> バックエンドアプリケーションはデータベースを使っていなくて、オンメモリでデータを保持しています。
> そのような作りのため、バックエンドアプリケーションを再起動するとデータはフラッシュします。

### テックスタック

* Nuxt 3系
* Vue 3系
* Protocol Buffers

### ディレクトリ構成

```
├── backend -- バックエンドアプリケーションの実装
├── frontend -- フロントエンドアプリケーションの実装
├── proto -- Protocol Buffersの定義
└── submodules -- proto内から参照するサードパーティの `.proto` ファイルを Git Submodules としてインポートする
```

### 開発の流れ

1. proto/ ディレクトリの `.proto` ファイルに、バックエンドアプリケーションとフロントエンドアプリケーションでやりとりするデータやエンドポイントの定義を行う
2. バックエンドアプリケーションとフロントエンドアプリケーションでそれぞれ開発を行う
3. フロントエンドアプリケーションは、モックサーバー([Nuxtの`server/`ディレクトリ](https://nuxt.com/docs/guide/directory-structure/server))を使って開発を行い、バックエンドアプリケーションと結合して動作確認をする

## 環境構築

[nodenv](https://github.com/nodenv/nodenv)を使っている方は以下のコマンドで推奨されるバージョンのNode.jsをインストールして下さい。

```
❯ nodenv install 22.6.0
❯ corepack enable
```

```
❯ npm i -g pnpm
```

```
❯ pnpm i --frozen-lockfile
```

## やってみよう

このプロジェクトは、コンテンツ下部の「Clear Completed」ボタンが未実装になっています。
このボタンを押下した時に、フロントエンドアプリケーションでイベントハンドリングして、バックエンドアプリケーションにAPIリクエストし、バックエンドアプリケーションから更新されたデータを取得する機能の開発を行います。

### 1 Protoファイルに定義を追加

フロントエンドアプリケーションとバックエンドアプリケーションでやりとりするデータを定義するために、[proto/todo.proto](https://github.com/tokuda109/nuxt3-protobuf-project-template/blob/main/proto/todo.proto)ファイルを以下のように修正して下さい。

```diff
service ToDoApi {
+   rpc ClearCompletedItems(ClearCompletedItemsRequest) returns (ClearCompletedItemsResponse) {
+     option (google.api.http) = {
+       post: "/api/v1/todos/clear_completed_items"
+       body: "*"
+     };
+   }
}

+ message ClearCompletedItemsRequest {}
+ 
+ message ClearCompletedItemsResponse {}
```

### 2 Protoファイルから実装を生成

ファイルを保存したら、プロジェクトのルートから以下のコマンドを実行して、修正したProto定義をフロントエンドアプリケーションとバックエンドアプリケーションに反映させます。

```
❯ protoc -I submodules/googleapis -I proto --plugin=backend/node_modules/.bin/protoc-gen-jsonpb-ts --jsonpb-ts_out=ignorePackage=true:backend/src/types/proto ./proto/*.proto
❯ protoc -I submodules/googleapis -I proto --plugin=frontend/node_modules/.bin/protoc-gen-jsonpb-ts --jsonpb-ts_out=ignorePackage=true:frontend/src/types/proto ./proto/*.proto
```

### 3 生成された実装に追加の実装をする

フロントエンドアプリケーションは、「」ボタンを押した時にイベントハンドラに処理がわたってくるところまで実装しているため、以下のようにコードを追加します。
修正する箇所は、[`frontend/src/pages/index.vue` ファイルの73行目](https://github.com/tokuda109/nuxt3-protobuf-project-template/blob/main/frontend/src/pages/index.vue#L73)になります。

```
- const clearCompleted = () => {};
+ const clearCompleted = async () => {
+   await $apiClient.request(new ToDoApi.ClearCompletedItems({}));
+   fetchItems();
+ };
```

## Protocol Buffersの定義追加

Protocol Buffersに定義を

```
❯ protoc -I submodules/googleapis -I proto --plugin=backend/node_modules/.bin/protoc-gen-jsonpb-ts --jsonpb-ts_out=ignorePackage=true:backend/src/types/proto ./proto/*.proto
❯ protoc -I submodules/googleapis -I proto --plugin=frontend/node_modules/.bin/protoc-gen-jsonpb-ts --jsonpb-ts_out=ignorePackage=true:frontend/src/types/proto ./proto/*.proto
```
