import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewStartupComponent } from './preview-startup.component';

describe('PreviewStartupComponent', () => {
  let component: PreviewStartupComponent;
  let fixture: ComponentFixture<PreviewStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewStartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
