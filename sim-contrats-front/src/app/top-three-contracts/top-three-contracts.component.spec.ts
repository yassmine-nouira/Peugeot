import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopThreeContractsComponent } from './top-three-contracts.component';

describe('TopThreeContractsComponent', () => {
  let component: TopThreeContractsComponent;
  let fixture: ComponentFixture<TopThreeContractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopThreeContractsComponent]
    });
    fixture = TestBed.createComponent(TopThreeContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
