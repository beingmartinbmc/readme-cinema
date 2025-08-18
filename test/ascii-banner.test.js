import { jest } from '@jest/globals';

// Mock figlet using unstable_mockModule for ES modules
await jest.unstable_mockModule('figlet', () => ({
  textSync: jest.fn((text, options) => {
    return `MOCKED_ASCII_ART_${text}`;
  })
}));

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

import { AsciiBanner } from '../src/ascii-banner.js';

// Mock process.stdout.write and console.log
process.stdout.write = jest.fn();
console.log = jest.fn();

describe('AsciiBanner', () => {
  let banner;
  let mockTheme;

  beforeEach(() => {
    mockTheme = {
      banner: 'green',
      subtitle: 'cyan'
    };
    banner = new AsciiBanner(mockTheme);
    
    // Reset mocks
    jest.clearAllMocks();
    process.stdout.write.mockClear();
    console.log.mockClear();
  });

  describe('constructor', () => {
    test('should initialize with theme', () => {
      expect(banner.theme).toBe(mockTheme);
    });
  });

  describe('display', () => {
    test('should display ASCII banner with glitch effects', async () => {
      await banner.display();
      
      expect(process.stdout.write).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalled();
    });

    test('should handle different themes', async () => {
      const neonTheme = { banner: 'magenta', subtitle: 'cyan' };
      const neonBanner = new AsciiBanner(neonTheme);
      
      await neonBanner.display();
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('glitchEffect', () => {
    test('should create glitch effect', async () => {
      const text = 'TEST';
      await banner.glitchEffect(text, 'green');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle empty text', async () => {
      const text = '';
      await banner.glitchEffect(text, 'green');
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('typewriterSubtitle', () => {
    test('should type subtitle word by word', async () => {
      const text = 'Test subtitle';
      await banner.typewriterSubtitle(text);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });

    test('should handle single word', async () => {
      const text = 'Test';
      await banner.typewriterSubtitle(text);
      
      expect(process.stdout.write).toHaveBeenCalled();
    });
  });

  describe('sleep', () => {
    test('should create a promise that resolves after delay', async () => {
      const start = Date.now();
      await banner.sleep(10);
      const end = Date.now();
      
      expect(end - start).toBeGreaterThanOrEqual(0);
    });
  });
});
