import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorDetailsComponent } from './sector-details.component';

describe('SectorDetailsComponent', () => {
  let component: SectorDetailsComponent;
  let fixture: ComponentFixture<SectorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
