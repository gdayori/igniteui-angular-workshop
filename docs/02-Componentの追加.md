# Component の新規追加

ここでは、API から取得したデータを表示するためのコンポーネントを Angular CLI の ng コマンドを利用して作成します。

## 目的
- Component の追加方法を学習します。
- Angular CLIをベースとしたアプリケーションの実行方法・確認方法を学習します。

## 手順
1. Compoent の生成
2. Component の利用
3. 実行結果の確認

## Compoent の生成

まず、ng generate コマンドで api-server-tables という名前のコンポーネントを作成します。

console

```sh
$ ng generate component api-server-tables
```
    ※ "api-server-tables" または "apiServerTables" のどちらをパラメタで渡しても結果は同じとなります。ファイル名はハイフン区切りで生成され、クラス名はキャメルケースで生成されます。

すると Angular CLI が App フォルダ配下に api-server-tables のコンポーネント関連ファイル一式を生成してくれます。

更に、app/app.module.ts の中で生成した Component の import ステートメントの追加およびモジュールの declarations へ追加を自動的に行なってくれます。

![](assets/02-01.png)

## Component の利用

続いて、生成したコンポーネントを利用します。既に左メニューに Router に登録されているアイテムが表示され、クリックすると対応するコンポーネントを右側のコンテンツ領域へ表示する仕組みが出来ているため、ここでは app/app-routing.module.ts を開き、以下のように先程追加したコンポーネントを Routes へ登録します。 

app/app-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyGridComponent } from './mygrid/mygrid.component';
import { MyMonsterGridComponent } from './mymonstergrid/mymonstergrid.component';
import { ApiServerTablesComponent } from './api-server-tables/api-server-tables.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { text: 'Home' } },
  { path: 'mygrid', component: MyGridComponent, data: { text: 'myGrid' } },
  { path: 'mymonstergrid', component: MyMonsterGridComponent, data: { text: 'myMonsterGrid' } },
  { path: 'apiServerTamples', component: ApiServerTablesComponent, data: { text: 'apiServerTamples' } }
];

・・・
```
## 実行結果の確認

ng serve コマンドでプロジェクトをビルドして、開発用のWEBサーバの起動します。

console

```sh
$ ng  serve -o
```

パラメタ --open (省略：-o)  でビルド＆Webサーバへ配備後にデフォルトブラウザを自動的に立ち上げて表示してくれます。

以下の実行結果のように、左メニューに apiServerTables が追加され、クリックすると右コンテンツ領域に apiServerTables のビュー定義 (app/api-server-tables.component.html)の内容が表示されます。

![](assets/02-02.png)

これで API Server から取得したデータを表現するためのコンポーネントを表示する事ができました。次は API へ接続するためのサービスを作成します。

## 補足
本ハンズオンではルーティングやナビゲーションの仕組みについては詳しく触れません。
興味の在る方は [Angular 公式ドキュメント Routing & Navigation](https://angular.io/guide/router) を参照下さい。

 [日本語版ドキュメント](https://angular.jp/guide/router) も有志により日本語化が進んでおります。ありがたい！※Routing については2018/5時点では未対応です。

## Next
[03-Serviceの追加と利用](03-Serviceの追加と利用.md)


