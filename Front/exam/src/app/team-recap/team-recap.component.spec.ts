import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRecapComponent } from './team-recap.component';

describe('TeamRecapComponent', () => {
  let component: TeamRecapComponent;
  let fixture: ComponentFixture<TeamRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRecapComponent]
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
