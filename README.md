# nuxt3-protobuf-project-template

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

```
❯ protoc -I submodules/googleapis -I proto --plugin=frontend/node_modules/.bin/protoc-gen-jsonpb-ts --jsonpb-ts_out=ignorePackage=true:frontend/src/types/proto ./proto/*.proto
```
