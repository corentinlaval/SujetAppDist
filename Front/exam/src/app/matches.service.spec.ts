import { TestBed } from '@angular/core/testing';

import { MatchesService } from './matches.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MatchesService', () => {
  let service: MatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
