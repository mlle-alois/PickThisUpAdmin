import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyZonesComponent } from './my-zones.component';

describe('MyZonesComponent', () => {
  let component: MyZonesComponent;
  let fixture: ComponentFixture<MyZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyZonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
