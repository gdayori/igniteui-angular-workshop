import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IgxNavigationDrawerModule, IgxNavbarModule, IgxLayoutModule, IgxRippleModule, IgxGridModule, IgxAvatarModule, IgxBadgeModule, IgxButtonModule, IgxIconModule, IgxInputGroupModule, IgxProgressBarModule, IgxSwitchModule, IgxToggleModule, IgxCheckboxModule } from 'igniteui-angular/main';
import { HomeComponent } from './home/home.component';
import { MonsterGridComponent } from './monstergrid/monstergrid.component';
import { IgxExcelExporterService } from 'igniteui-angular/services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonsterGridComponent
  ],
  imports: [
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
    IgxCheckboxModule
  ],
  providers: [IgxExcelExporterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
