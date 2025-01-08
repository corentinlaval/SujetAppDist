import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplayerComponent } from './addplayer.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddplayerComponent', () => {
  let component: AddplayerComponent;
  let fixture: ComponentFixture<AddplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddplayerComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
