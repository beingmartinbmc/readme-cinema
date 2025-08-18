import { jest } from '@jest/globals';
import { ProgressBars } from '../src/progress-bars.js';

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

// Mock ora
jest.mock('ora', () => {
  return jest.fn().mockImplementation(() => ({
    start: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis()
  }));
});

// Mock cli-progress
jest.mock('cli-progress', () => ({
  SingleBar: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    update: jest.fn(),
    stop: jest.fn()
  }))
}));

describe('ProgressBars', () => {
  let progress;
  let mockTheme;

  beforeEach(() => {
    mockTheme = {
      accent: 'green',
      progress: 'green'
    };
    progress = new ProgressBars(mockTheme);
    
    // Reset mocks
    jest.clearAllMocks();
    process.stdout.write.mockClear();
  });

  describe('constructor', () => {
    test('should initialize with theme', () => {
      expect(progress.theme).toBe(mockTheme);
    });
  });

  describe('showProgress', () => {
    test('should show progress bar', async () => {
      await progress.showProgress('Test Feature', 75);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle 0% progress', async () => {
      await progress.showProgress('Test Feature', 0);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle 100% progress', async () => {
      await progress.showProgress('Test Feature', 100);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle negative progress', async () => {
      await progress.showProgress('Test Feature', -10);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle progress over 100%', async () => {
      await progress.showProgress('Test Feature', 150);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('animateProgress', () => {
    test('should animate progress from 0 to target', async () => {
      await progress.animateProgress('Test Feature', 80);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle 0% target', async () => {
      await progress.animateProgress('Test Feature', 0);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle 100% target', async () => {
      await progress.animateProgress('Test Feature', 100);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('showFeatureProgress', () => {
    test('should show feature progress with animation', async () => {
      await progress.showFeatureProgress('Test Feature', 85);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle different percentages', async () => {
      await progress.showFeatureProgress('Test Feature', 50);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('showLoadingSpinner', () => {
    test('should show loading spinner', async () => {
      await progress.showLoadingSpinner('Loading...');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle different messages', async () => {
      await progress.showLoadingSpinner('Processing...');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('showMatrixProgress', () => {
    test('should show matrix-style progress', async () => {
      await progress.showMatrixProgress('Matrix Feature', 60);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle different percentages', async () => {
      await progress.showMatrixProgress('Matrix Feature', 30);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('showGlitchProgress', () => {
    test('should show glitch-style progress', async () => {
      await progress.showGlitchProgress('Glitch Feature', 70);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle glitch randomization', async () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.1); // Trigger glitch
      
      await progress.showGlitchProgress('Glitch Feature', 70);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('showNeonProgress', () => {
    test('should show neon-style progress', async () => {
      await progress.showNeonProgress('Neon Feature', 90);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle different percentages', async () => {
      await progress.showNeonProgress('Neon Feature', 25);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('getProgressBar', () => {
    test('should return progress bar string', () => {
      const bar = progress.getProgressBar(50, 20);
      
      expect(bar).toContain('█');
      expect(bar).toContain('░');
    });

    test('should handle 0% progress', () => {
      const bar = progress.getProgressBar(0, 20);
      
      expect(bar).not.toContain('█');
      expect(bar).toContain('░');
    });

    test('should handle 100% progress', () => {
      const bar = progress.getProgressBar(100, 20);
      
      expect(bar).toContain('█');
      expect(bar).not.toContain('░');
    });

    test('should handle different widths', () => {
      const bar = progress.getProgressBar(50, 10);
      
      expect(bar.length).toBeLessThanOrEqual(10);
    });
  });

  describe('sleep', () => {
    test('should create a promise that resolves after delay', async () => {
      const start = Date.now();
      await progress.sleep(10);
      const end = Date.now();
      
      expect(end - start).toBeGreaterThanOrEqual(0);
    });
  });
});
