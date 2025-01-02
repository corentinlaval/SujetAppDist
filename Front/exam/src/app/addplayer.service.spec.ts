import { TestBed } from '@angular/core/testing';

import { AddplayerService } from './addplayer.service';

describe('AddplayerService', () => {
  let service: AddplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
