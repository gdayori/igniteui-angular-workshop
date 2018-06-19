import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonsterGridComponent } from './monstergrid/monstergrid.component';
import { CustomersComponent } from './customers/customers.component';
import { Top10CountriesComponent } from './top10-countries/top10-countries.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { text: 'Home' } },
  { path: 'monstergrid', component: MonsterGridComponent, data: { text: 'MonsterGrid' } },
  { path: 'customers', component: CustomersComponent, data: { text: 'Customers' } },
  { path: 'top-10-countries', component: Top10CountriesComponent, data: { text: 'Top 10 countries' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
