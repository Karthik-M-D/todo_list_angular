import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodocrudComponent } from './todocrud.component';

describe('TodocrudComponent', () => {
  let component: TodocrudComponent;
  let fixture: ComponentFixture<TodocrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodocrudComponent]
    });
    fixture = TestBed.createComponent(TodocrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
