# Get data with HttpClient

In this section, you get customers records from Northwind Web Service by using Angular HttpClient and then display them in the customers component.

Customers records:
[http://northwind.servicestack.net/customers](http://northwind.servicestack.net/customers)

customers.json:
[http://northwind.servicestack.net/customers.json](http://northwind.servicestack.net/customers.json)

## 目的
- Angular の関連モジュールを利用する方法を学習する。
- Angular の HttpClient を利用して APIからデータを取得する方法を学習します。
- View における Data Binding 及び、ngFor 等の Directive の利用方法を学習する。

## Steps
1. HttpClientModule のインポート
2. HttpClientModule を利用してテーブル一覧を取得
3. テーブル一覧の表示
4. 実行結果の確認


## Import HttpClientModule

Import HttpClientModule in the app.module.ts so that you can use HttpClient in your Components.

app\app.module.ts

```ts
・・・
//Add
import { HttpClientModule } from '@angular/common/http';
・・・

・・・
  imports: [
    HttpClientModule,  //Add
    FormsModule,
・・・
```

## Get customers through HttpClient

Let's get customers records as json data from Northwind Web Service through HttpClient.

Open northwind-service.ts and do
 - import HttpClient and Observable
 - DI of HttpClient
 - use get() method to get data from the baseUrl

app/northwind-service.ts

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Add
import { Observable } from 'rxjs/Observable'; //Add

@Injectable()
export class NorthwindService {
  private baseUrl = 'http://northwind.servicestack.net/customers.json'; // API End Point

  constructor(private http: HttpClient) {
   }

   getCustomers(): Observable<any> {
    return this.http.get<any>(this.baseUrl)
    .map(res => {
      return res.Customers as any;
    });
     
   }
}
```
HttpClient.get() method returns Observable<T>. In the real world app it should be better 

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