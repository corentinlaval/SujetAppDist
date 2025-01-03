import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletematchesComponent } from './deletematches.component';

describe('DeletematchesComponent', () => {
  let component: DeletematchesComponent;
  let fixture: ComponentFixture<DeletematchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletematchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletematchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
