import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeDemandeComponent } from './mange-demande.component';

describe('MangeDemandeComponent', () => {
  let component: MangeDemandeComponent;
  let fixture: ComponentFixture<MangeDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangeDemandeComponent]
    });
    fixture = TestBed.createComponent(MangeDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
