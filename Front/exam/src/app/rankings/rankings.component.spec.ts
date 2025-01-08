import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsComponent } from './rankings.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RankingsComponent', () => {
  let component: RankingsComponent;
  let fixture: ComponentFixture<RankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingsComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
