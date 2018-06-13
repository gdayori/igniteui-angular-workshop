# igx-gridを利用して高機能グリッドを表示

ここでは、Ignite UI for Angular の igx-grid コンポーネントを利用して取得したデータを高機能グリッドに表示し、ユーザに様々な機能を提供します。

## 目的
- Ignite UI for Angular のコンポーネント利用方法を学習します。

## 手順
1. HttpClientModule のインポート
2. HttpClientModule を利用してテーブル一覧を取得
3. テーブル一覧の表示
4. 実行結果の確認


## Ignite UI for Angular 利用準備の確認

既に [01-Angular プロジェクトの作成と Ignite UI のインポート](01-Angularプロジェクトの作成とIgniteUIのインポート.md) でIgnite UI for Angularの部品の読み込みは完了していますが、今一度各コンポーネントがインポートされている事を確認しましょう。

![](assets/06-01.png)

※ Ignite UI CLI を利用した事により全てのコンポーネントがインポートされていますが、Angular CLIをベースにした実際の開発では個々のコンポーネントを必要なだけ読み込みます。

## igx-grid の利用

コンポーネントのテンプレート定義の中で、 igx-grid に列定義情報(columns)やテーブルのデータ(tableData)をバインドし、フィルタやソート、行選択など機能の設定を行いましょう。

以下のように、api-server-tables.component.html の Table タグの記述を igx-grid へ置き換えます。

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
              <igx-grid #grid1 id="grid1" [data]="tableData" rowSelectable="true" width="750px" height="500px">
                <igx-column *ngFor="let column of columns"
                  [field] = "column.field"
                  [header] = "column.field"
                  [width] = "column.width"
                  editable = "true" 
                  sortable = "true"
                  filterable = "true"
                  fixable = "true"
                  ></igx-column>
              </igx-grid>  
            </ng-container>  
      </div>
    </div>
  </div>
```

tableData は igx-grid の data プロパティへバインドし、columns は ngFor を使ってループ文で igx-column を生成しています。

また、igx-grid 自体の プロパティ設定では高さや幅の設定に加えて行選択機能の有効化を行い、igx-column では 編集可否やソート、フィルタ可否などを設定しています。

## 実行結果の確認

ng serve コマンドで実行結果を確認してみましょう。

console

```sh
$ ng  serve
```

![](assets/06-02.png)

各機能が動作していることを確認しましょう。

お時間のある方は、myMonsterGrid のコンポーネントクラスやテンプレート定義見ながら、他の機能実装やスタイルの変更についてご確認ください！

## 参考

- どんなUI部品があるのか見たい
<br>APIを詳しく確認したい
<br>サンプルコードを確認したい
<br>->[Ignite UI for Angular サンプルページ](https://jp.infragistics.com/products/ignite-ui-angular/angular/components/grid.html)

- 製品の概要・全体的な特徴を知りたい
<br>->[Ignite UI for Angular 製品ページ](https://jp.infragistics.com/products/ignite-ui-angular)

- 製品自体の内部のソースコードが見たい
<br>ロードマップやリリース予定を確認したい
<br>Issue登録、機能要望、他
<br>->[Github: Ignite UI for Angular](https://angular.io/guide/http) 

