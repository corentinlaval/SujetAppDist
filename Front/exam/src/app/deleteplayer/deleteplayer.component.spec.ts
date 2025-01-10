import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteplayerComponent } from './deleteplayer.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DeleteplayerComponent', () => {
  let component: DeleteplayerComponent;
  let fixture: ComponentFixture<DeleteplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteplayerComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
