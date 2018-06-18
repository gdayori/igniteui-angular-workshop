# API からテーブルデータを取得

ここでは、ユーザがテーブル一覧より閲覧したいテーブルをクリックした際に、そのイベントを取得してサービスを呼び出し API からテーブルデータを取得します。また、取得したテーブルデータをコンポーネント側で表示します。


## 目的
- View における Event Binding の方法を学習します。
- Angular の HttpClient を利用して APIからデータを取得する方法を学習します。

## 手順
1. HttpClientModule のインポート
2. HttpClientModule を利用してテーブル一覧を取得
3. テーブル一覧の表示
4. 実行結果の確認


## アイテムのクリックイベントをバインドする

ユーザがテーブル一覧よりテーブルを選択（クリック）した際のイベントをバインドします。

まず、コンポーネントクラス内でアイテムがクリックされた際のメソッドを作成します。ここでは console.log でメソッドが呼ばれたことを確認出来るようにしておきます。


app\api-server-tables\api-server-tables.component.ts
```ts
...
  ngOnInit() {
...
  }

  itemClicked(tableName: string): void {
    console.log(tableName);
  }
...
```
つづいて、対応するテンプレート側を編集します。コンポーネントクラスで定義した itemClicked() を以下のような Event Binding の記述でバインドします。

app\api-server-tables\api-server-tables.component.html

```html
...
      <span (click)="itemClicked(item)" igxDrawerItem>
        {{item}}
      </span>
...
```

実行して結果をみてみましょう。テーブル一覧のアイテムをクリックすると、コンソールにテーブル名が出力されることが確認できます。

![](assets/05-01.png)

## クリックされたテーブルのレコードを取得する。

続いて、サービス側でクリックされたテーブルのレコード情報を取得する getTableData() メソッドを作成します。

app/api-server-service.ts

```ts
...
  //テーブル名を引数にテーブルの全レコードを取得
  getTableData(tableName: string): Observable<string[]>  {
    return this.http.get<any>(`${this.baseUrl}/${tableName}/`, {headers: this.headers})
    .map(res => res.value);
  }
...
```

引数にテーブル名を渡して、ベースURLにテーブル名を加えてリクエストを投げています。返却値は Observable ですが、本ハンズオンではどんなテーブルのスキーマ情報でも汎用的に取得できるよう string[] で型指定しています。（※実際に特定のテーブルのデータを取得する際には class APITable のようにモデル定義を行いましょう。）

## 取得したデータの表示

getTableData() メソッドで取得したデータをコンポーネント側で表示してみましょう。

ApiServerTablesComponentの関連ファイルをそれぞれ以下のように変更してみましょう。

app\api-server-tables\api-server-tables.component.ts
```ts
...
export class ApiServerTablesComponent implements OnInit {
  constructor(private apiServerService: ApiServerService) { }

  tableNames: string[] = []; //テーブル名配列
  columns = null; //列情報を保持
  tableData: Object[] = null; //テーブルのデータを保持

  ngOnInit() {
    this.apiServerService
    .getTables()
    .subscribe(tables => {
        for (const tableObj of tables) {
          this.tableNames.push( tableObj.name);
        }
    });
  }

  //アイテムクリック
  itemClicked(tableName: string): void {
    this.apiServerService.getTableData(tableName).subscribe(
      data => {
        //先頭行のスキーマより列定義を抜き出す
        const firstRowColumns = Object.keys(data[0]);
        const firstRow = data[0];
        const numOfColumns = firstRowColumns.length;  //
        const columns = [];
        for (let i = 0; i < numOfColumns; i++) {
          columns.push({ field: firstRowColumns[i], width: 80 + (firstRowColumns[i].length * 10)});
        }
        //列定義の設定
        this.columns = columns;
        //テーブルデータの設定
        this.tableData = data;
      });
  }
}
...
```

app\api-server-tables\api-server-tables.component.html

```html
<div class="main" igxLayout>
  <ul igxFlex="0 0 250px">
    <li *ngFor="let item of tableNames">
      <span (click)="itemClicked(item)" igxDrawerItem>
        {{item}}
      </span>
    </li>
  </ul>
  <div igxFlex>
    <div class="content">
      <ng-container *ngIf="tableData">
        <table class="htmlTable">
          <thead>
            <th *ngFor="let column of columns">{{column.field}}</th>
          </thead>
          <tbody>
            <tr *ngFor="let record of tableData">
              <td *ngFor="let column of columns">{{record[column.field]}}</td>
            </tr>
          </tbody>
        </table>
      </ng-container> 
    </div>
  </div>
</div>
```

app\api-server-tables\api-server-tables.component.scss

```css
:host{
    width: 100%;
}
.htmlTable th, .htmlTable td {
    border: 1px solid;
}
```

まず、api-server-tables.component.ts の中では getTableData() を呼び出してAPIより取得した対象テーブルのデータを取得しています。受け取ったデータは先頭行をループ回してスキーマ情報を抜き出して、列名を保持する配列を作成しています。そして列名を保持する this.columns とテーブルのデータそのものを保持する this.tableData を設定します。

次に、api-server-tables.component.html の中では ngFor ディレクティブを駆使して、Tableタグの中で、それぞれヘッダ情報をTHタグへ、中のデータをTDタグへ書き出しています。結果として以下のようなHTML DOM構成で出力されます。

```html
<table>
  <thead>
    <th>column1</th>
    <th>column2</th>
    <th>column3</th>
  </thead>
  <tbody>
    <tr>
      <td>data1-1</td>
      <td>data1-2</td>
      <td>data1-3</td>
    </tr>
    <tr>
      <td>data1-1</td>
      <td>data1-2</td>
      <td>data1-3</td>
    </tr>
    ...
  </tbody>
<table>
```

## 実行結果の確認

ng serve コマンドで実行結果を確認してみましょう。

console

```sh
$ ng  serve
```

![](assets/05-02.png)

これで、ユーザが選択したテーブルのデータを取得して ApiServerTablesComponent の中で表示されることが出来ました！

ですが、見た目が良くないですし、使いづらいですね。また、画面全体の縦スクロールが豆粒のようになっており、全ての HTML DOM 要素が描画されているようです。大量に表示すると描画パフォーマンスやメモリに良くないですね...

続いては、Ignite UI for Angular のグリッド部品を利用して高機能なグリッド表示に切り替えてみましょう！

## Next
[06-igx-gridを利用して高機能グリッドを表示](06-igx-gridを利用して高機能グリッドを表示.md) 

