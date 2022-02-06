import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGenreComponent } from './add-edit-genre.component';

describe('AddEditGenreComponent', () => {
  let component: AddEditGenreComponent;
  let fixture: ComponentFixture<AddEditGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGenreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
