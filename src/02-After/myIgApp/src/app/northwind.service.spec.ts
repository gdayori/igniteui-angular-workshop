import { TestBed, inject } from '@angular/core/testing';

import { NorthwindService } from './northwind.service';

describe('NorthwindService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NorthwindService]
    });
  });

  it('should be created', inject([NorthwindService], (service: NorthwindService) => {
    expect(service).toBeTruthy();
  }));
});
