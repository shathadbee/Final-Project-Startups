import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovelStartupComponent } from './approvel-startup.component';

describe('ApprovelStartupComponent', () => {
  let component: ApprovelStartupComponent;
  let fixture: ComponentFixture<ApprovelStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovelStartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovelStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
