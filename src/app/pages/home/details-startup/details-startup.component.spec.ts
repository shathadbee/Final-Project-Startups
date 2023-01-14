import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStartupComponent } from './details-startup.component';

describe('DetailsStartupComponent', () => {
  let component: DetailsStartupComponent;
  let fixture: ComponentFixture<DetailsStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsStartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
