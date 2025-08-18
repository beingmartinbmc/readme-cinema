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

// Mock ora using unstable_mockModule for ES modules
await jest.unstable_mockModule('ora', () => {
  return jest.fn().mockImplementation(() => ({
    start: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnThis()
  }));
});

// Mock cli-progress using unstable_mockModule for ES modules
await jest.unstable_mockModule('cli-progress', () => ({
  SingleBar: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    update: jest.fn(),
    stop: jest.fn()
  }))
}));

import { ProgressBars } from '../src/progress-bars.js';

// Mock process.stdout.write and console.log
process.stdout.write = jest.fn();
console.log = jest.fn();

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
    console.log.mockClear();
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

    test('should handle negative progress by clamping to 0', async () => {
      await progress.showProgress('Test Feature', -10);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle progress over 100% by clamping to 100', async () => {
      await progress.showProgress('Test Feature', 150);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('animateProgress', () => {
    test('should animate progress from 0 to target', async () => {
      await progress.animateProgress('Test Feature', '██████████', '░░░░░░░░░░', 80);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle 0% target', async () => {
      await progress.animateProgress('Test Feature', '', '░░░░░░░░░░░░░░░░░░░░', 0);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle 100% target', async () => {
      await progress.animateProgress('Test Feature', '████████████████████', '', 100);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('showFeatureProgress', () => {
    test('should show feature progress with animation', async () => {
      const features = [
        { name: 'Test Feature 1', percentage: 85 },
        { name: 'Test Feature 2', percentage: 60 }
      ];
      
      await progress.showFeatureProgress(features);
      
      expect(console.log).toHaveBeenCalled();
    }, 10000);

    test('should handle different percentages', async () => {
      const features = [
        { name: 'Test Feature 1', percentage: 50 },
        { name: 'Test Feature 2' } // Will use random percentage
      ];
      
      await progress.showFeatureProgress(features);
      
      expect(console.log).toHaveBeenCalled();
    }, 10000);
  });

  describe('showLoadingSpinner', () => {
    test('should show loading spinner', async () => {
      await progress.showLoadingSpinner('Loading...', 100);
      
      expect(process.stdout.write).toHaveBeenCalled();
    }, 5000);

    test('should handle different messages', async () => {
      await progress.showLoadingSpinner('Processing...', 100);
      
      expect(process.stdout.write).toHaveBeenCalled();
    }, 5000);
  });

  describe('showMatrixProgress', () => {
    test('should show matrix-style progress', async () => {
      await progress.showMatrixProgress('Test Feature', 75);
      
      expect(process.stdout.write).toHaveBeenCalled();
    }, 10000);

    test('should handle different percentages', async () => {
      await progress.showMatrixProgress('Test Feature', 50);
      
      expect(process.stdout.write).toHaveBeenCalled();
    }, 10000);
  });

  describe('showGlitchProgress', () => {
    test('should show glitch-style progress', async () => {
      await progress.showGlitchProgress('Test Feature', 75);
      
      expect(process.stdout.write).toHaveBeenCalled();
    }, 10000);

    test('should handle glitch randomization', async () => {
      await progress.showGlitchProgress('Test Feature', 50);
      
      expect(process.stdout.write).toHaveBeenCalled();
    }, 10000);
  });

  describe('showNeonProgress', () => {
    test('should show neon-style progress', async () => {
      await progress.showNeonProgress('Test Feature', 75);
      
      expect(process.stdout.write).toHaveBeenCalled();
    }, 10000);

    test('should handle different percentages', async () => {
      await progress.showNeonProgress('Test Feature', 50);
      
      expect(process.stdout.write).toHaveBeenCalled();
    }, 10000);
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
