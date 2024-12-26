import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonoteComponent } from './nonote.component';

describe('NonoteComponent', () => {
  let component: NonoteComponent;
  let fixture: ComponentFixture<NonoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
