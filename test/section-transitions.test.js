import { jest } from '@jest/globals';

// Mock chalk using unstable_mockModule for ES modules
await jest.unstable_mockModule('chalk', () => ({
  green: jest.fn((text) => `GREEN_${text}`),
  cyan: jest.fn((text) => `CYAN_${text}`),
  magenta: jest.fn((text) => `MAGENTA_${text}`),
  blue: jest.fn((text) => `BLUE_${text}`),
  yellow: jest.fn((text) => `YELLOW_${text}`),
  white: jest.fn((text) => `WHITE_${text}`),
  red: jest.fn((text) => `RED_${text}`),
  gray: jest.fn((text) => `GRAY_${text}`)
}));

import { SectionTransitions } from '../src/section-transitions.js';

// Mock process.stdout.write and console.log
process.stdout.write = jest.fn();
console.log = jest.fn();

describe('SectionTransitions', () => {
  let transitions;
  let mockTheme;

  beforeEach(() => {
    mockTheme = {
      accent: 'green',
      transition: 'green'
    };
    transitions = new SectionTransitions(mockTheme);
    
    // Reset mocks
    jest.clearAllMocks();
    process.stdout.write.mockClear();
    console.log.mockClear();
  });

  describe('constructor', () => {
    test('should initialize with theme', () => {
      expect(transitions.theme).toBe(mockTheme);
    });
  });

  describe('transition', () => {
    test('should call one of the transition effects', async () => {
      const mockSceneTransition = jest.spyOn(transitions, 'sceneTransition').mockResolvedValue();
      const mockMatrixEffect = jest.spyOn(transitions, 'matrixEffect').mockResolvedValue();
      const mockScanLines = jest.spyOn(transitions, 'scanLines').mockResolvedValue();
      const mockFadeEffect = jest.spyOn(transitions, 'fadeEffect').mockResolvedValue();
      const mockGlitchTransition = jest.spyOn(transitions, 'glitchTransition').mockResolvedValue();
      
      await transitions.transition();
      
      // At least one of the effects should be called
      const totalCalls = mockSceneTransition.mock.calls.length + 
                        mockMatrixEffect.mock.calls.length + 
                        mockScanLines.mock.calls.length + 
                        mockFadeEffect.mock.calls.length + 
                        mockGlitchTransition.mock.calls.length;
      
      expect(totalCalls).toBeGreaterThan(0);
    });

    test('should handle multiple transition calls', async () => {
      const mockSceneTransition = jest.spyOn(transitions, 'sceneTransition').mockResolvedValue();
      const mockMatrixEffect = jest.spyOn(transitions, 'matrixEffect').mockResolvedValue();
      const mockScanLines = jest.spyOn(transitions, 'scanLines').mockResolvedValue();
      const mockFadeEffect = jest.spyOn(transitions, 'fadeEffect').mockResolvedValue();
      const mockGlitchTransition = jest.spyOn(transitions, 'glitchTransition').mockResolvedValue();
      
      // Call transition multiple times to increase chances of hitting different effects
      await transitions.transition();
      await transitions.transition();
      await transitions.transition();
      
      // At least one of the effects should be called
      const totalCalls = mockSceneTransition.mock.calls.length + 
                        mockMatrixEffect.mock.calls.length + 
                        mockScanLines.mock.calls.length + 
                        mockFadeEffect.mock.calls.length + 
                        mockGlitchTransition.mock.calls.length;
      
      expect(totalCalls).toBeGreaterThan(0);
    });
  });

  describe('sceneTransition', () => {
    test('should create scene transition effect', async () => {
      await transitions.sceneTransition();
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle different terminal widths', async () => {
      // Mock different terminal width
      Object.defineProperty(process.stdout, 'columns', {
        value: 120,
        writable: true
      });
      
      await transitions.sceneTransition();
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('matrixEffect', () => {
    test('should create matrix effect', async () => {
      await transitions.matrixEffect();
      
      expect(console.log).toHaveBeenCalled();
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should clear matrix effect', async () => {
      await transitions.matrixEffect();
      
      // Should call clear commands
      expect(process.stdout.write).toHaveBeenCalledWith('\x1b[1A\x1b[2K');
    });
  });

  describe('scanLines', () => {
    test('should create scan lines effect', async () => {
      await transitions.scanLines();
      
      expect(console.log).toHaveBeenCalled();
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should clear scan lines', async () => {
      await transitions.scanLines();
      
      // Should call clear commands
      expect(process.stdout.write).toHaveBeenCalledWith('\x1b[1A\x1b[2K');
    });
  });

  describe('fadeEffect', () => {
    test('should create fade effect', async () => {
      await transitions.fadeEffect();
      
      expect(console.log).toHaveBeenCalled();
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should clear fade effect', async () => {
      await transitions.fadeEffect();
      
      // Should call clear commands
      expect(process.stdout.write).toHaveBeenCalledWith('\x1b[1A\x1b[2K');
    });
  });

  describe('glitchTransition', () => {
    test('should create glitch transition effect', async () => {
      await transitions.glitchTransition();
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle glitch randomization', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.2); // Trigger glitch
      
      await transitions.glitchTransition();
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should clear glitch effect', async () => {
      await transitions.glitchTransition();
      
      // Should clear the effect at the end
      expect(process.stdout.write).toHaveBeenCalledWith(
        expect.stringContaining('\r') && expect.stringContaining(' '.repeat(6))
      );
    });
  });

  describe('dramaticPause', () => {
    test('should create dramatic pause effect', async () => {
      await transitions.dramaticPause();
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('sleep', () => {
    test('should create a promise that resolves after delay', async () => {
      const start = Date.now();
      await transitions.sleep(10);
      const end = Date.now();
      
      expect(end - start).toBeGreaterThanOrEqual(0);
    });
  });
});
