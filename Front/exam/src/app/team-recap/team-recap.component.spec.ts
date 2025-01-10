import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRecapComponent } from './team-recap.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('TeamRecapComponent', () => {
  let component: TeamRecapComponent;
  let fixture: ComponentFixture<TeamRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRecapComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
