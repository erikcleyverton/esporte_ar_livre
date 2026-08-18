import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponiveisComponent } from './disponiveis-component';

describe('DisponiveisComponent', () => {
  let component: DisponiveisComponent;
  let fixture: ComponentFixture<DisponiveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponiveisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisponiveisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
