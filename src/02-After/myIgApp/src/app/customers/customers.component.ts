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
        }
      );
  }
  public exportExcel() {
    this.excelExporterService.export(this.grid, new IgxExcelExporterOptions('ExportedExcel'));
  }
}
