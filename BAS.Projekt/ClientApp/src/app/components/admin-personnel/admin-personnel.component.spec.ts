import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonnelComponent } from './admin-personnel.component';

describe('AdminPersonnelComponent', () => {
  let component: AdminPersonnelComponent;
  let fixture: ComponentFixture<AdminPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
