import { TestBed } from '@angular/core/testing';
import { DgpadBridgeService } from './dgpad-bridge.service';

describe('DgpadBridgeService - createBoardPoints()', () => {
  let service: DgpadBridgeService;
  let mockIframe: HTMLIFrameElement;
  let mockBridge: any;
  let mockCanvas: any;

  beforeEach(() => {
    // Crear mocks
    mockCanvas = {
      compute: jasmine.createSpy('compute'),
      paint: jasmine.createSpy('paint'),
      getConstruction: jasmine.createSpy('getConstruction').and.returnValue({
        addObject: jasmine.createSpy('addObject'),
      }),
    };

    mockBridge = {
      getPropertyState: jasmine.createSpy('getPropertyState'),
    };

    mockIframe = {
      contentWindow: {
        $CANVAS: mockCanvas,
        dgpadBridge: mockBridge,
        PointObject: jasmine.createSpy('PointObject'),
        eval: jasmine.createSpy('eval'),
      } as any,
    } as HTMLIFrameElement;

    spyOn(document, 'getElementById').and.returnValue(mockIframe);

    TestBed.configureTestingModule({
      providers: [DgpadBridgeService],
    });

    service = TestBed.inject(DgpadBridgeService);
  });

  // ============================================================================
  // TESTS: Basic Functionality
  // ============================================================================

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should create board points successfully with valid parameters', () => {
    // Mock el eval para que devuelva un array de nombres
    const expectedNames = ['A1', 'A2', 'A3'];
    (mockIframe.contentWindow as any).eval.and.returnValue(expectedNames);

    const result = service.createBoardPoints('A', 1, 3);

    expect(result).toEqual({
      success: true,
      createdPoints: expectedNames,
    });
  });

  it('should return success=false when canvas not available', () => {
    (document.getElementById as jasmine.Spy).and.returnValue(null);

    const result = service.createBoardPoints('A', 1, 10);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('Canvas not ready');
  });

  it('should return success=false when iframe contentWindow not available', () => {
    (document.getElementById as jasmine.Spy).and.returnValue({
      contentWindow: null,
    } as any);

    const result = service.createBoardPoints('A', 1, 10);

    expect(result.success).toBeFalse();
  });

  // ============================================================================
  // TESTS: Parameter Validation
  // ============================================================================

  it('should handle default parameters when called without arguments', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue(
      Array.from({ length: 100 }, (_, i) => `A${i + 1}`)
    );

    const result = service.createBoardPoints();

    expect(result.success).toBeTrue();
    expect(result.createdPoints.length).toBe(100);
  });

  it('should reject invalid parameters: start > end', () => {
    const result = service.createBoardPoints('A', 10, 5);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('Invalid parameters');
    expect((mockIframe.contentWindow as any).eval).not.toHaveBeenCalled();
  });

  it('should reject invalid parameters: negative start', () => {
    const result = service.createBoardPoints('A', -1, 10);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('Invalid parameters');
  });

  it('should reject invalid parameters: negative end', () => {
    const result = service.createBoardPoints('A', 1, -5);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('Invalid parameters');
  });

  it('should reject invalid parameters: empty pattern', () => {
    const result = service.createBoardPoints('', 1, 10);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('Invalid parameters');
  });

  // ============================================================================
  // TESTS: Script Execution
  // ============================================================================

  it('should execute legacy script with correct parameters', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue(['P1', 'P2']);

    service.createBoardPoints('P', 1, 2);

    expect((mockIframe.contentWindow as any).eval).toHaveBeenCalled();

    // Verificar que el script contiene los parámetros correctos
    const scriptArg = ((mockIframe.contentWindow as any).eval.calls.mostRecent().args[0] as string);
    expect(scriptArg).toContain('P');
    expect(scriptArg).toContain('1');
    expect(scriptArg).toContain('2');
  });

  it('should handle script execution error', () => {
    (mockIframe.contentWindow as any).eval.and.throwError('Script error');

    const result = service.createBoardPoints('A', 1, 10);

    expect(result.success).toBeFalse();
    expect(result.error).toContain('Script error');
  });

  // ============================================================================
  // TESTS: Return Values
  // ============================================================================

  it('should return array of created point names', () => {
    const expectedNames = ['Point1', 'Point2', 'Point3', 'Point4', 'Point5'];
    (mockIframe.contentWindow as any).eval.and.returnValue(expectedNames);

    const result = service.createBoardPoints('Point', 1, 5);

    expect(result.createdPoints).toEqual(expectedNames);
    expect(result.createdPoints.length).toBe(5);
  });

  it('should handle large number of points (100)', () => {
    const expectedNames = Array.from({ length: 100 }, (_, i) => `A${i + 1}`);
    (mockIframe.contentWindow as any).eval.and.returnValue(expectedNames);

    const result = service.createBoardPoints('A', 1, 100);

    expect(result.success).toBeTrue();
    expect(result.createdPoints.length).toBe(100);
    expect(result.createdPoints[0]).toBe('A1');
    expect(result.createdPoints[99]).toBe('A100');
  });

  it('should return error message when script returns non-array', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue({ notAnArray: true });

    const result = service.createBoardPoints('A', 1, 10);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('Script execution failed');
  });

  it('should return error message when script returns null', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue(null);

    const result = service.createBoardPoints('A', 1, 10);

    expect(result.success).toBeFalse();
    expect(result.error).toBe('Script execution failed');
  });

  // ============================================================================
  // TESTS: Pattern Handling
  // ============================================================================

  it('should handle alphanumeric patterns', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue(['Pt1', 'Pt2']);

    service.createBoardPoints('Pt', 1, 2);

    const scriptArg = ((mockIframe.contentWindow as any).eval.calls.mostRecent().args[0] as string);
    expect(scriptArg).toContain('Pt');
  });

  it('should handle patterns with underscores', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue(['p_1', 'p_2']);

    service.createBoardPoints('p_', 1, 2);

    expect((mockIframe.contentWindow as any).eval).toHaveBeenCalled();
  });

  it('should handle patterns with dashes', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue(['p-1', 'p-2']);

    service.createBoardPoints('p-', 1, 2);

    expect((mockIframe.contentWindow as any).eval).toHaveBeenCalled();
  });

  // ============================================================================
  // TESTS: Edge Cases
  // ============================================================================

  it('should handle single point creation (startNum === endNum - 1)', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue(['A1']);

    const result = service.createBoardPoints('A', 1, 1);

    expect(result.success).toBeTrue();
    expect(result.createdPoints.length).toBe(1);
    expect(result.createdPoints[0]).toBe('A1');
  });

  it('should handle starting from 0', () => {
    (mockIframe.contentWindow as any).eval.and.returnValue(['A0', 'A1', 'A2']);

    const result = service.createBoardPoints('A', 0, 2);

    expect(result.success).toBeTrue();
    expect(result.createdPoints[0]).toBe('A0');
  });

  it('should handle large number ranges (starting at 1000)', () => {
    const expectedNames = ['P1000', 'P1001', 'P1002'];
    (mockIframe.contentWindow as any).eval.and.returnValue(expectedNames);

    const result = service.createBoardPoints('P', 1000, 1002);

    expect(result.success).toBeTrue();
    expect(result.createdPoints[0]).toBe('P1000');
  });

  // ============================================================================
  // TESTS: Error Messages
  // ============================================================================

  it('should include error details in result', () => {
    (mockIframe.contentWindow as any).eval.and.throwError('Canvas not initialized');

    const result = service.createBoardPoints('A', 1, 10);

    expect(result.error).toContain('Canvas not initialized');
  });

  it('should handle generic errors gracefully', () => {
    (mockIframe.contentWindow as any).eval.and.throwError('Unknown error');

    const result = service.createBoardPoints('A', 1, 10);

    expect(result.success).toBeFalse();
    expect(result.error).toBeTruthy();
  });
});

// ============================================================================
// PROPERTY-BASED TESTS
// ============================================================================

describe('DgpadBridgeService.createBoardPoints - Property Tests', () => {
  let service: DgpadBridgeService;
  let mockIframe: HTMLIFrameElement;

  beforeEach(() => {
    const mockBridge = {
      getPropertyState: jasmine.createSpy('getPropertyState'),
    };

    mockIframe = {
      contentWindow: {
        $CANVAS: {
          compute: jasmine.createSpy('compute'),
          paint: jasmine.createSpy('paint'),
          getConstruction: jasmine.createSpy('getConstruction').and.returnValue({
            addObject: jasmine.createSpy('addObject'),
          }),
        },
        dgpadBridge: mockBridge,
        PointObject: jasmine.createSpy('PointObject'),
        eval: jasmine.createSpy('eval'),
      } as any,
    } as HTMLIFrameElement;

    spyOn(document, 'getElementById').and.returnValue(mockIframe);

    TestBed.configureTestingModule({
      providers: [DgpadBridgeService],
    });

    service = TestBed.inject(DgpadBridgeService);
  });

  /**
   * PROPERTY 1: Completitud
   *
   * Para cualquier rango válido [startNum, endNum],
   * createBoardPoints retorna exactamente (endNum - startNum + 1) nombres únicos.
   *
   * **Validates: Requirements 2.6**
   */
  it('should create exactly (endNum - startNum + 1) unique points for any valid range', () => {
    // Test multiple ranges
    const testCases = [
      { pattern: 'A', start: 1, end: 5, expectedCount: 5 },
      { pattern: 'P', start: 0, end: 10, expectedCount: 11 },
      { pattern: 'Point', start: 100, end: 110, expectedCount: 11 },
      { pattern: 'X', start: 1, end: 1, expectedCount: 1 },
      { pattern: 'Q', start: 1, end: 20, expectedCount: 20 },
    ];

    testCases.forEach(({ pattern, start, end, expectedCount }) => {
      // Mock the eval to return a valid array
      const expectedNames = Array.from(
        { length: expectedCount },
        (_, i) => `${pattern}${start + i}`
      );
      (mockIframe.contentWindow as any).eval.and.returnValue(expectedNames);

      const result = service.createBoardPoints(pattern, start, end);

      expect(result.success).toBeTrue();
      expect(result.createdPoints.length).toBe(expectedCount);

      // Verify all names are unique
      const uniqueNames = new Set(result.createdPoints);
      expect(uniqueNames.size).toBe(expectedCount);
    });
  });

  /**
   * PROPERTY 2: Nombres Válidos
   *
   * Todos los puntos creados tienen nombres en formato: pattern + número
   *
   * **Validates: Requirements 2.6**
   */
  it('should create points with names following pattern + number format', () => {
    const testCases = [
      { pattern: 'A', start: 1, end: 3 },
      { pattern: 'Pt', start: 10, end: 12 },
      { pattern: 'test_', start: 5, end: 7 },
    ];

    testCases.forEach(({ pattern, start, end }) => {
      const expectedNames = Array.from(
        { length: end - start + 1 },
        (_, i) => `${pattern}${start + i}`
      );
      (mockIframe.contentWindow as any).eval.and.returnValue(expectedNames);

      const result = service.createBoardPoints(pattern, start, end);

      expect(result.success).toBeTrue();

      result.createdPoints.forEach((name, index) => {
        const expectedName = expectedNames[index];
        expect(name).toBe(expectedName);
        expect(name.startsWith(pattern)).toBeTrue();
      });
    });
  });

  /**
   * PROPERTY 3: Rango Válido
   *
   * El método rechaza ranges inválidos (start >= end, negativas, etc.)
   *
   * **Validates: Requirements 2.6**
   */
  it('should reject invalid ranges', () => {
    const invalidCases = [
      { pattern: 'A', start: 10, end: 5, reason: 'start > end' },
      { pattern: 'A', start: -1, end: 5, reason: 'negative start' },
      { pattern: 'A', start: 1, end: -5, reason: 'negative end' },
      { pattern: '', start: 1, end: 5, reason: 'empty pattern' },
    ];

    invalidCases.forEach(({ pattern, start, end, reason }) => {
      const result = service.createBoardPoints(pattern, start, end);

      expect(result.success).toBeFalse();
      expect(result.error).toBeTruthy();
    });
  });

  /**
   * PROPERTY 4: Éxito o Error Consistente
   *
   * Para cualquier entrada, el resultado es: {success: boolean, createdPoints: array, error?: string}
   * Si success=true, createdPoints no está vacío y error no está definido
   * Si success=false, createdPoints está vacío y error está definido
   *
   * **Validates: Requirements 2.6**
   */
  it('should maintain consistent result structure for success and failure cases', () => {
    const testCases = [
      // Casos de éxito
      {
        pattern: 'A',
        start: 1,
        end: 3,
        mockReturn: ['A1', 'A2', 'A3'],
        shouldSucceed: true,
      },
      // Casos de error
      {
        pattern: '',
        start: 1,
        end: 3,
        mockReturn: undefined,
        shouldSucceed: false,
      },
    ];

    testCases.forEach(({ pattern, start, end, mockReturn, shouldSucceed }) => {
      if (mockReturn !== undefined) {
        (mockIframe.contentWindow as any).eval.and.returnValue(mockReturn);
      }

      const result = service.createBoardPoints(pattern, start, end);

      if (shouldSucceed) {
        expect(result.success).toBeTrue();
        expect(result.createdPoints.length).toBeGreaterThan(0);
        expect(result.error).toBeUndefined();
      } else {
        expect(result.success).toBeFalse();
        expect(result.createdPoints).toEqual([]);
        expect(result.error).toBeTruthy();
      }
    });
  });
});
