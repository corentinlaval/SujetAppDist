import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddmatchesComponent } from './addmatches.component';
import { FormsModule } from '@angular/forms';

describe('AddmatchesComponent', () => {
  let component: AddmatchesComponent;
  let fixture: ComponentFixture<AddmatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddmatchesComponent,
        HttpClientTestingModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
