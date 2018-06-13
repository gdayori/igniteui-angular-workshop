# API からテーブル一覧を取得

ここでは、HttpClientModuleを利用して API からデータを取得し返却する関数を作成します。また、取得したテーブル一覧をコンポーネント側で表示します。

## 目的
- Angular の関連モジュールを利用する方法を学習する。
- Angular の HttpClient を利用して APIからデータを取得する方法を学習します。
- View における Data Binding 及び、ngFor 等の Directive の利用方法を学習する。

## 手順
1. HttpClientModule のインポート
2. HttpClientModule を利用してテーブル一覧を取得
3. テーブル一覧の表示
4. 実行結果の確認


## HttpClientModule のインポート

まず、APIよりデータを取得するために利用したい HttpClientModule を AppModule で Import して利用出来る状態とします。

以下のように、HttpClientModuleを@NgModuleデコレータ内の imports に追加します。

app\app.module.ts

```ts
・・・
//追加
import { HttpClientModule } from '@angular/common/http';
・・・

・・・
  imports: [
    HttpClientModule,  //追加
    FormsModule,
・・・
```

## HttpClientModule を利用してテーブル一覧を取得

続いて、サービス側で HttpClientModule を利用するために、 HttpClient, HttpHeaders をインポートし、DI により HttpClient のインスタンスを受け取ります。更に HttpClient を利用して getTables() 関数の中でAPIのエンドポイントへアクセスし、テーブル一覧(メタデータの一覧)を取得します。

以下のように編集して下さい。

app/api-server-service.ts

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//API Server のテーブル情報(MetaData)のスキーマ定義
export class APITable {
  name: string;
  kind: string;
  url: string;
}

@Injectable()
export class ApiServerService {

  //APIのエンドポイントと認証情報
  //（各自のエンドポイントや認証情報を設定して下さい。）
  private baseUrl = 'https://?????/api.rsc'; //APIエンドポイント
  private userName = 'user-name'; //ID
  private authToken = 'auth-taken'; //token
  private headers = new HttpHeaders(
    {
      'Authorization': 'Basic ' + btoa(this.userName + ':' + this.authToken)
    }
  );

  constructor(private http: HttpClient) { }

  //テーブル一覧を取得
  getTables(): Observable<APITable[]> {
    return this.http.get<any>(this.baseUrl, {headers: this.headers})
    .map(res => res.value as APITable[]);
  }
}
```
HttpClient の get() メソッドは Observable 型を返すので、事前に定義しておいたテーブルのメタデータのスキーマ APITable の配列型を指定して、getTables() メソッドの返却値としています。また、.map()　の中でAPIの戻り値の value を返却するようにしていますが、これは OData が value の中に結果セットを入れているためにマッピングしているものです。

## テーブル一覧の表示

getTables() メソッドで取得したテーブル一覧をコンポーネント側で表示してみましょう。

ApiServerTablesComponentの関連ファイルをそれぞれ以下のように変更してみましょう。

app\api-server-tables\api-server-tables.component.ts
```ts
・・・
export class ApiServerTablesComponent implements OnInit {

  constructor(private apiServerService: ApiServerService) { }

  tableNames: string[] = [];

  ngOnInit() {
    this.apiServerService
    .getTables()
    .subscribe(tables => {
      for (const tableObj of tables) {
        this.tableNames.push( tableObj.name);
      }
    });
  }
}
・・・
```

app\api-server-tables\api-server-tables.component.html

```html
<div class="main" igxLayout>
  <ul igxFlex="0 0 250px">
    <li *ngFor="let item of tableNames">
      <span igxDrawerItem>
        {{item}}
      </span>
    </li>
  </ul>
</div>
```

app\api-server-tables\api-server-tables.component.scss

```css
:host{
    width: 100%;
}
```

まず、api-server-tables.component.ts の中では getTables() より返却される Observable型 を Subscribe() することで、APIから結果が帰ってきた際に非同期で結果データを受け取れるように準備しています。ここではアロー関数を利用していますが、Subscribe の第一引数で その結果データを受け取る関数を記述しています。そして、取得したデータは For 文でテーブル名の string 配列 tableNames としてクラスの中では保持します。

次に、api-server-tables.component.html の中では ngFor ディレクティブを利用してテーブル名の string 配列 tableNames をループで li エレメントとして書き出していきます。結果として以下のようなHTML DOM構成で出力されます。

```html
<ul>
  <ui>table1</ui>
  <ui>table2</ui>
  <ui>table3</ui>
<ul>
```

その他、igxLayout, igxFlex や scss クラスの記述はレイアウトを整えているだけのものですので、ここでは気にせず先に進んで下さい。


## 実行結果の確認

ng serve コマンドで実行結果を確認してみましょう。

console

```sh
$ ng  serve
```

![](assets/04-01.png)

これで、サービス経由で取得した API のテーブル一覧を ApiServerTablesComponent の中で表示されることが出来ました。次はユーザが選択したテーブルのデータ(レコード)を取得します。

## 参考

[Angular 公式ドキュメント HttpClient](https://angular.io/guide/http) 

## Next

[05-APIからテーブルデータを取得](05-APIからテーブルデータを取得.md)