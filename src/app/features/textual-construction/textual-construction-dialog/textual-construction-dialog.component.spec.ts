import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextualConstructionDialogComponent } from './textual-construction-dialog.component';

describe('TextualConstructionDialogComponent', () => {
  let component: TextualConstructionDialogComponent;
  let fixture: ComponentFixture<TextualConstructionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextualConstructionDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextualConstructionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open and set visible to true', () => {
    component.open();
    expect(component.visible).toBeTrue();
  });

  it('should close, set visible to false, and emit closed', () => {
    spyOn(component.closed, 'emit');
    component.open();
    component.close();

    expect(component.visible).toBeFalse();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should emit buildRequested and close when valid text is provided', () => {
    spyOn(component.buildRequested, 'emit');
    spyOn(component.closed, 'emit');

    component.open();
    component.text = 'A: Punto cualquiera\nB: Punto cualquiera';
    component.build();

    expect(component.buildRequested.emit).toHaveBeenCalledWith('A: Punto cualquiera\nB: Punto cualquiera');
    expect(component.visible).toBeFalse();
  });

  it('should not emit buildRequested when text is empty or only whitespace', () => {
    spyOn(component.buildRequested, 'emit');

    component.open();
    component.text = '   ';
    component.build();

    expect(component.buildRequested.emit).not.toHaveBeenCalled();
    expect(component.visible).toBeTrue();
  });

  it('should clear text when clear() is called', () => {
    component.text = 'Some construction text';
    component.clear();
    expect(component.text).toBe('');
  });
});
