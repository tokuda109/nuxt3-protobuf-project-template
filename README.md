# nuxt3-protobuf-project-template

このリポジトリは、[Vue Fes Japan 2024](https://vuefes.jp/2024)で発表した「Protocol BuffersとNuxt3で開発生産性を上げるためのスキーマファースト開発の紹介」のLTのためのデモプロジェクトです。  
プレゼンテーションで紹介したスキーマファースト開発の雰囲気を掴むことができるように作成しています。

> [!NOTE]  
> このプロジェクトは、基本的な機能は実装済みですが、1機能だけ未実装で留めています。
> もし興味がある方は、続きの作業をやりきって、スキーマファースト開発の流れを実際に試してみて下さい。

## アプリケーションの概要

このプロジェクトは、フロントエンドとバックエンドの２つのアプリケーションで構成されます。
アプリケーションはToDoリストを管理することができ、バックエンドアプリケーションはToDoリストのデータを保持し、フロントエンドアプリケーションにAPIとしてデータ提供をします。  
フロントエンドアプリケーションはバックエンドアプリケーションから提供されるAPIを使ってToDoリストのUIを提供します。

> [!NOTE]  
> バックエンドアプリケーションはデータベースを使っていなくて、オンメモリでデータを保持しています。
> そのような作りのため、バックエンドアプリケーションを再起動するとデータはフラッシュします。

### 環境

フロントエンドアプリケーションは、アプリケーションの起動モードとして以下の２つを用意しました:

- 開発用: バックエンドアプリケーションの開発と並行して、フロントエンドアプリケーションの開発をするための環境。このモードでアプリケーションを起動すると、モックサーバーにAPIリクエストを行います。
- 本番用: 両方のアプリケーションの開発が完了して、両方を結合して動作させるための環境。このモードでアプリケーションを起動すると、バックエンドアプリケーションのサーバーにAPIリクエストを行います。

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

次のコマンドでソースコードをダウンロードします。

```
❯ git clone git@github.com:tokuda109/nuxt3-protobuf-project-template.git && cd nuxt3-protobuf-project-template
```

次のコマンドでGit Submoduleをダウンロードします。

```
❯ git submodule update --init --remote
```

[nodenv](https://github.com/nodenv/nodenv)を使っている方は以下のコマンドで推奨されるバージョンのNode.jsをインストールして下さい。

```
❯ nodenv install 22.6.0
❯ corepack enable
```

以下のコマンドでPNPMをインストールし、依存パッケージをインストールします。

```
❯ npm i -g pnpm
❯ pnpm i --frozen-lockfile
```

以下のコマンドを実行し、バックエンドアプリケーションとフロントエンドアプリケーションを起動します。

```
❯ turbo dev
```

http://localhost:3000 にアクセスするとデモアプリケーション(フロントエンドアプリケーション)を見ることができます。

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

ファイルを保存したら、プロジェクトのルートから以下のコマンドを実行して、修正したProto定義をフロントエンドアプリケーションに反映させます。

```
❯ protoc -I submodules/googleapis -I proto --plugin=frontend/node_modules/.bin/protoc-gen-jsonpb-ts --jsonpb-ts_out=ignorePackage=true:frontend/src/types/proto ./proto/*.proto
```

> [!NOTE]  
> 本当はこのタイミングでバックエンドアプリケーションにもProto定義を反映させますが、今回はフロントエンドエンジニア側の視点から開発を体験してもらいたいので、バックエンドへの反映は省略します。
> バックエンドへの反映は既に行っているため、フロントエンド側のみ反映してください。

### 3 生成された実装に追加の実装をする

フロントエンドアプリケーションは、「Clear Completed」ボタンを押した時にイベントハンドラに処理がわたってくるところまで実装しているため、以下のようにコードを追加します。
修正する箇所は、[`frontend/src/pages/index.vue` ファイルの73行目](https://github.com/tokuda109/nuxt3-protobuf-project-template/blob/main/frontend/src/pages/index.vue#L73)になります。

```diff
- const clearCompleted = () => {};
+ const clearCompleted = async () => {
+   await $apiClient.request(new ToDoApi.ClearCompletedItems({}));
+   fetchItems();
+ };
```

バックエンドアプリケーションの実装は、この発表のメイントピックではないため、あらかじめ実装済みです。
実際の開発では、フロントエンドとバックエンドが同時に開発スタートするため、フロントエンドアプリケーションの開発をしている間にバックエンドアプリケーションも開発が行われていると思います。  
なので、フロントエンドの開発はモックサーバーを使って行います。

開発用のサーバーを起動すると、モックサーバーにAPIリクエストするため、以下のコマンドで開発用のサーバーを起動しましょう。

```
❯ pnpm --filter=frontend dev
```

「Clear Completed」ボタンを押下すると、Chrome DevTools で `/api/v1/todos/clear_completed_items` に対するリクエストが発生することが確認できると思います。

### 4 モックサーバーのデータを用意する

モックサーバーのデータ準備がまだできていないので、`/api/v1/todos/clear_completed_items` へのリクエストは失敗していると思います。

`frontend/src/server/api/v1/todos/clear_completed_items.ts` ファイルを作成し、次のコードをコピペして下さい。

```diff
+ import type { ClearCompletedItemsResponse } from '~/types/proto/todo_pb';
+ 
+ export default defineEventHandler<ClearCompletedItemsResponse>(() => {
+   return {};
+ });
```

モックサーバーがリクエストを受け付けるようになったので、今度はリクエストが成功すると思います。

### 5 バックエンドアプリケーションと結合する

最後にバックエンドアプリケーションと結合した状態でフロントエンドアプリケーションを起動してみましょう。

`pnpm --filter=frontend dev` を実行して開発用サーバーを起動した場合、モックサーバー(`/frontend/src/server/api` ディレクトリ配下のファイルが使われる)がダミーデータを返しますが、バックエンドとフロントエンドの両方の開発が終わるとTEST環境で結合して動かします。  
バックエンドアプリケーションにリクエストするためには、次のコマンドを実行してフロントエンドアプリケーションを起動します。

```
❯ pnpm --filter=frontend build
❯ pnpm --filter=frontend start
```

別のターミナルから、次のコマンドでバックエンドアプリケーションも起動します。

```
❯ pnpm --filter=backend start
```

今度はフロントエンドアプリケーションからのリクエストは、バックエンドアプリケーションに対して送られるため、ToDoアイテムが動的に増減すると思います。

### おまけ

バックエンドアプリケーションにもProto定義を反映させるコマンドを紹介します。

```
❯ protoc -I submodules/googleapis -I proto --plugin=backend/node_modules/.bin/protoc-gen-jsonpb-ts --jsonpb-ts_out=ignorePackage=true:backend/src/types/proto ./proto/*.proto
```
