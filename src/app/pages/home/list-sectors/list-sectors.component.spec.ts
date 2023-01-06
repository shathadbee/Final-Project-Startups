import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSectorsComponent } from './list-sectors.component';

describe('ListSectorsComponent', () => {
  let component: ListSectorsComponent;
  let fixture: ComponentFixture<ListSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSectorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
