import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmatchesComponent } from './addmatches.component';

describe('AddmatchesComponent', () => {
  let component: AddmatchesComponent;
  let fixture: ComponentFixture<AddmatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
