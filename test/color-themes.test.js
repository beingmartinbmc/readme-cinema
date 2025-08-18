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
  gray: jest.fn((text) => `GRAY_${text}`),
  black: jest.fn((text) => `BLACK_${text}`),
  bgGreen: jest.fn((text) => `BG_GREEN_${text}`),
  bgCyan: jest.fn((text) => `BG_CYAN_${text}`),
  bgMagenta: jest.fn((text) => `BG_MAGENTA_${text}`),
  bgBlue: jest.fn((text) => `BG_BLUE_${text}`),
  bgYellow: jest.fn((text) => `BG_YELLOW_${text}`),
  bgWhite: jest.fn((text) => `BG_WHITE_${text}`),
  bgRed: jest.fn((text) => `BG_RED_${text}`),
  bgBlack: jest.fn((text) => `BG_BLACK_${text}`),
  bold: jest.fn((text) => `BOLD_${text}`),
  italic: jest.fn((text) => `ITALIC_${text}`),
  underline: jest.fn((text) => `UNDERLINE_${text}`),
  dim: jest.fn((text) => `DIM_${text}`),
  bright: jest.fn((text) => `BRIGHT_${text}`)
}));

import { ColorThemes } from '../src/color-themes.js';

describe('ColorThemes', () => {
  describe('theme definitions', () => {
    test('should have all required themes', () => {
      expect(ColorThemes).toBeDefined();
      expect(Object.keys(ColorThemes)).toHaveLength(8);
      expect(ColorThemes.hacker).toBeDefined();
      expect(ColorThemes.neon).toBeDefined();
      expect(ColorThemes.classic).toBeDefined();
      expect(ColorThemes.matrix).toBeDefined();
      expect(ColorThemes.cyberpunk).toBeDefined();
      expect(ColorThemes.retro).toBeDefined();
      expect(ColorThemes.dark).toBeDefined();
      expect(ColorThemes.rainbow).toBeDefined();
    });

    test('should have hacker theme properties', () => {
      const theme = ColorThemes.hacker;
      expect(theme.banner).toBe('green');
      expect(theme.subtitle).toBe('cyan');
      expect(theme.heading).toBe('green');
      expect(theme.text).toBe('white');
      expect(theme.code).toBe('yellow');
      expect(theme.accent).toBe('cyan');
      expect(theme.progress).toBe('green');
      expect(theme.list).toBe('cyan');
      expect(theme.blockquote).toBe('gray');
      expect(theme.transition).toBe('green');
    });

    test('should have neon theme properties', () => {
      const theme = ColorThemes.neon;
      expect(theme.banner).toBe('magenta');
      expect(theme.subtitle).toBe('cyan');
      expect(theme.heading).toBe('magenta');
      expect(theme.text).toBe('white');
      expect(theme.code).toBe('yellow');
      expect(theme.accent).toBe('cyan');
      expect(theme.progress).toBe('magenta');
      expect(theme.list).toBe('cyan');
      expect(theme.blockquote).toBe('gray');
      expect(theme.transition).toBe('magenta');
    });

    test('should have classic theme properties', () => {
      const theme = ColorThemes.classic;
      expect(theme.banner).toBe('blue');
      expect(theme.subtitle).toBe('gray');
      expect(theme.heading).toBe('blue');
      expect(theme.text).toBe('white');
      expect(theme.code).toBe('yellow');
      expect(theme.accent).toBe('blue');
      expect(theme.progress).toBe('blue');
      expect(theme.list).toBe('white');
      expect(theme.blockquote).toBe('gray');
      expect(theme.transition).toBe('blue');
    });

    test('should have matrix theme properties', () => {
      const theme = ColorThemes.matrix;
      expect(theme.banner).toBe('green');
      expect(theme.subtitle).toBe('green');
      expect(theme.heading).toBe('green');
      expect(theme.text).toBe('white');
      expect(theme.code).toBe('yellow');
      expect(theme.accent).toBe('green');
      expect(theme.progress).toBe('green');
      expect(theme.list).toBe('green');
      expect(theme.blockquote).toBe('gray');
      expect(theme.transition).toBe('green');
    });

    test('should have cyberpunk theme properties', () => {
      const theme = ColorThemes.cyberpunk;
      expect(theme.banner).toBe('magenta');
      expect(theme.subtitle).toBe('cyan');
      expect(theme.heading).toBe('magenta');
      expect(theme.text).toBe('white');
      expect(theme.code).toBe('yellow');
      expect(theme.accent).toBe('cyan');
      expect(theme.progress).toBe('magenta');
      expect(theme.list).toBe('cyan');
      expect(theme.blockquote).toBe('gray');
      expect(theme.transition).toBe('magenta');
    });

    test('should have retro theme properties', () => {
      const theme = ColorThemes.retro;
      expect(theme.banner).toBe('yellow');
      expect(theme.subtitle).toBe('cyan');
      expect(theme.heading).toBe('yellow');
      expect(theme.text).toBe('white');
      expect(theme.code).toBe('green');
      expect(theme.accent).toBe('cyan');
      expect(theme.progress).toBe('yellow');
      expect(theme.list).toBe('cyan');
      expect(theme.blockquote).toBe('gray');
      expect(theme.transition).toBe('yellow');
    });

    test('should have dark theme properties', () => {
      const theme = ColorThemes.dark;
      expect(theme.banner).toBe('white');
      expect(theme.subtitle).toBe('gray');
      expect(theme.heading).toBe('white');
      expect(theme.text).toBe('gray');
      expect(theme.code).toBe('yellow');
      expect(theme.accent).toBe('white');
      expect(theme.progress).toBe('white');
      expect(theme.list).toBe('gray');
      expect(theme.blockquote).toBe('gray');
      expect(theme.transition).toBe('white');
    });

    test('should have rainbow theme properties', () => {
      const theme = ColorThemes.rainbow;
      expect(theme.banner).toBe('red');
      expect(theme.subtitle).toBe('yellow');
      expect(theme.heading).toBe('green');
      expect(theme.text).toBe('white');
      expect(theme.code).toBe('cyan');
      expect(theme.accent).toBe('magenta');
      expect(theme.progress).toBe('blue');
      expect(theme.list).toBe('yellow');
      expect(theme.blockquote).toBe('gray');
      expect(theme.transition).toBe('red');
    });
  });

  describe('theme structure', () => {
    test('should have all required properties for each theme', () => {
      const requiredProperties = [
        'banner', 'subtitle', 'heading', 'text', 'code', 
        'accent', 'progress', 'list', 'blockquote', 'transition'
      ];

      Object.values(ColorThemes).forEach(theme => {
        requiredProperties.forEach(prop => {
          expect(theme).toHaveProperty(prop);
        });
      });
    });

    test('should have valid color values', () => {
      const validColors = [
        'green', 'cyan', 'magenta', 'blue', 'yellow', 
        'white', 'red', 'gray', 'black'
      ];

      Object.values(ColorThemes).forEach(theme => {
        Object.values(theme).forEach(color => {
          expect(validColors).toContain(color);
        });
      });
    });
  });
});
