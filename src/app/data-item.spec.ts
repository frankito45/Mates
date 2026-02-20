import { TestBed } from '@angular/core/testing';

import { DataItem } from './data-item';

describe('DataItem', () => {
  let service: DataItem;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
