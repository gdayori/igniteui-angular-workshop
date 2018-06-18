# Export Excel
In this section, you add a capability to export the grid as an Excel file.

## Add a button for exporting

Open customers.component.html and add a button above the grid. Use igxButton and igxRipple directive so you can easily create a rich button. Bind the click event to exportData() method.

app/customers/customers.component.html

```html
<button igxButton="flat" igxButtonColor="white" igxButtonBackground="green" igxRipple="#09f" (click)="exportData()">
  <igx-icon>file_download</igx-icon>
  <span>TO EXCEL</span>
</button>
<igx-grid ...
...
```

## Use ExcelEsporter

Import the following classes required to export the grid as an Excel file.
 - ViewChild from '@angular/core' which is requred for getting the grid in Component.
 - IgxGridComponent from 'igniteui-angular/grid/grid.component' which is required for recognizing igx-grid in Component
- IgxExcelExporterService and IgxExcelExporterOptions from 'igniteui-angular/services' which are required for exporting Excel file.

Import statement should be like

```ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NorthwindService } from '../northwind.service';
import { IgxGridComponent } from 'igniteui-angular/grid/grid.component';
import {IgxExcelExporterService, IgxExcelExporterOptions} from 'igniteui-angular/services';
...
```

Inject IgxExcelExporterService so you can use it in a Component as below.

```ts
...
constructor(private northwindService: NorthwindService,
  private excelExporterService: IgxExcelExporterService) { }
...
```

Get the grid by using ViewChild.
```ts
...
customersTable: Object[] = null;
@ViewChild('grid') grid: IgxGridComponent;
...
```

Add a function exportExcel() to handle clicking the button. To export the grid as an Excel file, what you need to do is just calling export() method and pass the grid and tthejhe file name.

```ts
...
public exportExcel() {
  this.excelExporterService.export(this.grid, new IgxExcelExporterOptions('ExportedExcel'));
}
...
```

The customers.component.ts should be like below at the last.

```ts
...
import { Component, OnInit, ViewChild } from '@angular/core';
import { NorthwindService } from '../northwind.service';
import { IgxGridComponent } from 'igniteui-angular/grid/grid.component';
import {IgxExcelExporterService, IgxExcelExporterOptions} from 'igniteui-angular/services';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private northwindService: NorthwindService,
    private excelExporterService: IgxExcelExporterService) { }

  customersTable: Object[] = null;
  @ViewChild('grid') grid: IgxGridComponent;

  ngOnInit() {
    this.northwindService
      .getCustomers()
      .subscribe(
        data => {
          this.customersTable = data;
          console.log(this.customersTable);
        }
      );
  }
  public exportExcel() {
    this.excelExporterService.export(this.grid, new IgxExcelExporterOptions('ExportedExcel'));
  }
}
```

If you have time to configure excel exporter more, please reffer the API refenrece and do some more configulation.

[Sample and API for excel exporter](https://www.infragistics.com/products/ignite-ui-angular/angular/components/exporter_excel.html)

## Check the result

Save the files you changed and check the result.

![](assets/06-01.png)


## Next

[05-APIからテーブルデータを取得](05-APIからテーブルデータを取得.md)
