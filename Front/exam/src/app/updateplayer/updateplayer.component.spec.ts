import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlayerComponent } from './updateplayer.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UpdateplayerComponent', () => {
  let component: UpdatePlayerComponent;
  let fixture: ComponentFixture<UpdatePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePlayerComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
