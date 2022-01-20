import { TestBed } from '@angular/core/testing';

import { DataStorageServiceService } from './data-storage-service.service';

describe('DataStorageServiceService', () => {
  let service: DataStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
