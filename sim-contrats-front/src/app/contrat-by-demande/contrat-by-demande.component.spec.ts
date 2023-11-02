import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratByDemandeComponent } from './contrat-by-demande.component';

describe('ContratByDemandeComponent', () => {
  let component: ContratByDemandeComponent;
  let fixture: ComponentFixture<ContratByDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratByDemandeComponent]
    });
    fixture = TestBed.createComponent(ContratByDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
