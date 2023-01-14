import { TestBed } from '@angular/core/testing';

import { AppInitalizService } from './app-initaliz.service';

describe('AppInitalizService', () => {
  let service: AppInitalizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitalizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
