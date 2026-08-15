import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamesPanelComponent } from './names-panel.component';

describe('NamesPanelComponent', () => {
  let component: NamesPanelComponent;
  let fixture: ComponentFixture<NamesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NamesPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NamesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
