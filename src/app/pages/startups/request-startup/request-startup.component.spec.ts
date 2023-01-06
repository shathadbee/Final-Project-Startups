import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStartupComponent } from './request-startup.component';

describe('RequestStartupComponent', () => {
  let component: RequestStartupComponent;
  let fixture: ComponentFixture<RequestStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestStartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
