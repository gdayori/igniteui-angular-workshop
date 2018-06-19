import { Component, OnInit } from '@angular/core';
import { NorthwindService } from '../northwind.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-top10-countries',
  templateUrl: './top10-countries.component.html',
  styleUrls: ['./top10-countries.component.scss']
})
export class Top10CountriesComponent implements OnInit {

  constructor(private northwindService: NorthwindService) { }
  top10Countries: Object[] = null;

  ngOnInit() {
    this.northwindService
      .getCustomers()
      .subscribe(
        data => {
          var result = _(data)
            .groupBy('Country')
            .map(function (items, Country) {
              return { Country: Country, count: items.length };
            }).value();
          this.top10Countries = _.orderBy(result, 'count').reverse().slice(0, 10);
          console.log(this.top10Countries);
        }
      );
  }
}
