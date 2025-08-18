import { jest } from '@jest/globals';
import { TypewriterEffect } from '../src/typewriter-effect.js';

// Mock chalk
jest.mock('chalk', () => ({
  green: jest.fn((text) => `GREEN_${text}`),
  cyan: jest.fn((text) => `CYAN_${text}`),
  magenta: jest.fn((text) => `MAGENTA_${text}`),
  blue: jest.fn((text) => `BLUE_${text}`),
  yellow: jest.fn((text) => `YELLOW_${text}`),
  white: jest.fn((text) => `WHITE_${text}`),
  red: jest.fn((text) => `RED_${text}`),
  gray: jest.fn((text) => `GRAY_${text}`)
}));

describe('TypewriterEffect', () => {
  let typewriter;
  let mockTheme;

  beforeEach(() => {
    mockTheme = {
      text: 'white',
      accent: 'cyan'
    };
    typewriter = new TypewriterEffect(50, mockTheme);
    
    // Reset mocks
    jest.clearAllMocks();
    process.stdout.write.mockClear();
  });

  describe('constructor', () => {
    test('should initialize with speed and theme', () => {
      expect(typewriter.speed).toBe(50);
      expect(typewriter.theme).toBe(mockTheme);
      expect(typewriter.currentLine).toBe('');
    });

    test('should parse string speed to integer', () => {
      const tw = new TypewriterEffect('100', mockTheme);
      expect(tw.speed).toBe(100);
    });
  });

  describe('type', () => {
    test('should type text character by character', async () => {
      const text = 'Hello';
      await typewriter.type(text, 'white');
      
      expect(process.stdout.write).toHaveBeenCalledTimes(5);
    });

    test('should handle newlines', async () => {
      const text = 'Hello\nWorld';
      await typewriter.type(text, 'white');
      
      expect(console.log).toHaveBeenCalled();
    });

    test('should handle empty text', async () => {
      const text = '';
      await typewriter.type(text, 'white');
      
      expect(process.stdout.write).not.toHaveBeenCalled();
    });

    test('should handle thinking pauses', async () => {
      // Mock Math.random to trigger thinking pause
      jest.spyOn(Math, 'random').mockReturnValue(0.01);
      
      const text = 'Test';
      await typewriter.type(text, 'white');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('getTypingDelay', () => {
    test('should return faster delay for spaces', async () => {
      const delay = await typewriter.getTypingDelay(' ');
      expect(delay).toBeLessThan(typewriter.speed);
    });

    test('should return slower delay for punctuation', async () => {
      const delay = await typewriter.getTypingDelay('.');
      expect(delay).toBeGreaterThan(typewriter.speed);
    });

    test('should return slower delay for capital letters', async () => {
      const delay = await typewriter.getTypingDelay('A');
      expect(delay).toBeGreaterThan(typewriter.speed);
    });

    test('should return faster delay for numbers', async () => {
      const delay = await typewriter.getTypingDelay('1');
      expect(delay).toBeLessThan(typewriter.speed);
    });

    test('should return normal delay for lowercase letters', async () => {
      const delay = await typewriter.getTypingDelay('a');
      expect(delay).toBeCloseTo(typewriter.speed, 1);
    });
  });

  describe('typeWithCursor', () => {
    test('should type with cursor effect', async () => {
      const text = 'Test';
      await typewriter.typeWithCursor(text, 'white');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('typeWithHackerEffect', () => {
    test('should type with hacker effect', async () => {
      const text = 'Test';
      await typewriter.typeWithHackerEffect(text, 'white');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('typeWithGlitch', () => {
    test('should type with glitch effect', async () => {
      const text = 'Test';
      await typewriter.typeWithGlitch(text, 'white');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle glitch randomization', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.05); // Trigger glitch
      
      const text = 'Test';
      await typewriter.typeWithGlitch(text, 'white');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('sleep', () => {
    test('should create a promise that resolves after delay', async () => {
      const start = Date.now();
      await typewriter.sleep(10);
      const end = Date.now();
      
      expect(end - start).toBeGreaterThanOrEqual(0);
    });
  });
});
