import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatematchesComponent } from './updatematches.component';

describe('UpdatematchesComponent', () => {
  let component: UpdatematchesComponent;
  let fixture: ComponentFixture<UpdatematchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatematchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatematchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
