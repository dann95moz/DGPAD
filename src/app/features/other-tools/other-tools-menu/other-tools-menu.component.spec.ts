import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherToolsMenuComponent } from './other-tools-menu.component';

describe('OtherToolsMenuComponent', () => {
  let component: OtherToolsMenuComponent;
  let fixture: ComponentFixture<OtherToolsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherToolsMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherToolsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
