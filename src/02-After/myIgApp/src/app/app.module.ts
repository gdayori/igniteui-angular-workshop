import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IgxNavigationDrawerModule, IgxNavbarModule, IgxLayoutModule, IgxRippleModule, IgxGridModule, IgxAvatarModule, IgxBadgeModule, IgxButtonModule, IgxIconModule, IgxInputGroupModule, IgxProgressBarModule, IgxSwitchModule, IgxToggleModule, IgxCheckboxModule } from 'igniteui-angular/main';
import { IgxCategoryChartModule } from 'igniteui-angular-charts/ES5/igx-category-chart-module';

import { HomeComponent } from './home/home.component';
import { MonsterGridComponent } from './monstergrid/monstergrid.component';
import { IgxExcelExporterService } from 'igniteui-angular/services';
import { CustomersComponent } from './customers/customers.component';
import { NorthwindService } from './northwind.service';
import { HttpClientModule } from '@angular/common/http';
import { Top10CountriesComponent } from './top10-countries/top10-countries.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonsterGridComponent,
    CustomersComponent,
    Top10CountriesComponent
  ],
  imports: [
    HttpClientModule,  //Add
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IgxNavigationDrawerModule,
    IgxNavbarModule,
    IgxLayoutModule,
    IgxRippleModule,
    IgxGridModule.forRoot(),
    IgxAvatarModule,
    IgxBadgeModule,
    IgxButtonModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxProgressBarModule,
    IgxSwitchModule,
    IgxToggleModule,
    IgxCheckboxModule,
    IgxCategoryChartModule
  ],
  providers: [IgxExcelExporterService,
    NorthwindService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
