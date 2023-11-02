import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWidgettsComponent } from './top-widgetts.component';

describe('TopWidgettsComponent', () => {
  let component: TopWidgettsComponent;
  let fixture: ComponentFixture<TopWidgettsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopWidgettsComponent]
    });
    fixture = TestBed.createComponent(TopWidgettsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
