import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillpointsComponent } from './fillpoints.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FillpointsComponent', () => {
  let component: FillpointsComponent;
  let fixture: ComponentFixture<FillpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillpointsComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
