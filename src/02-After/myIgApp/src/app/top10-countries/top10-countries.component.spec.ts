import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10CountriesComponent } from './top10-countries.component';

describe('Top10CountriesComponent', () => {
  let component: Top10CountriesComponent;
  let fixture: ComponentFixture<Top10CountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10CountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
