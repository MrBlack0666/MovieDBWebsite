import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPersonnelComponent } from './add-edit-personnel.component';

describe('AddEditPersonnelComponent', () => {
  let component: AddEditPersonnelComponent;
  let fixture: ComponentFixture<AddEditPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
