import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalZoneComponent } from './signal-zone.component';

describe('SignalZoneComponent', () => {
  let component: SignalZoneComponent;
  let fixture: ComponentFixture<SignalZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
