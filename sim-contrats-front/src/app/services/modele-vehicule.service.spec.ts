import { TestBed } from '@angular/core/testing';

import { ModeleVehiculeService } from './modele-vehicule.service';

describe('ModeleVehiculeService', () => {
  let service: ModeleVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeleVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
