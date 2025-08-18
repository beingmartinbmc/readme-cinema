import { jest } from '@jest/globals';
import { ColorThemes } from '../src/color-themes.js';

// Mock chalk
jest.mock('chalk', () => ({
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

describe('ColorThemes', () => {
  let themes;

  beforeEach(() => {
    themes = new ColorThemes();
  });

  describe('constructor', () => {
    test('should initialize with all themes', () => {
      expect(themes.themes).toBeDefined();
      expect(Object.keys(themes.themes)).toHaveLength(8);
    });
  });

  describe('getTheme', () => {
    test('should return hacker theme by default', () => {
      const theme = themes.getTheme();
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('green');
      expect(theme.subtitle).toBe('cyan');
    });

    test('should return hacker theme explicitly', () => {
      const theme = themes.getTheme('hacker');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('green');
      expect(theme.subtitle).toBe('cyan');
    });

    test('should return neon theme', () => {
      const theme = themes.getTheme('neon');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('magenta');
      expect(theme.subtitle).toBe('cyan');
    });

    test('should return classic theme', () => {
      const theme = themes.getTheme('classic');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('blue');
      expect(theme.subtitle).toBe('white');
    });

    test('should return matrix theme', () => {
      const theme = themes.getTheme('matrix');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('green');
      expect(theme.subtitle).toBe('green');
    });

    test('should return cyberpunk theme', () => {
      const theme = themes.getTheme('cyberpunk');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('magenta');
      expect(theme.subtitle).toBe('cyan');
    });

    test('should return retro theme', () => {
      const theme = themes.getTheme('retro');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('yellow');
      expect(theme.subtitle).toBe('cyan');
    });

    test('should return dark theme', () => {
      const theme = themes.getTheme('dark');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('white');
      expect(theme.subtitle).toBe('gray');
    });

    test('should return rainbow theme', () => {
      const theme = themes.getTheme('rainbow');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('magenta');
      expect(theme.subtitle).toBe('cyan');
    });

    test('should return hacker theme for unknown theme', () => {
      const theme = themes.getTheme('unknown');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('green');
      expect(theme.subtitle).toBe('cyan');
    });

    test('should handle case insensitive theme names', () => {
      const theme = themes.getTheme('HACKER');
      expect(theme).toBeDefined();
      expect(theme.banner).toBe('green');
    });
  });

  describe('getAvailableThemes', () => {
    test('should return all available theme names', () => {
      const availableThemes = themes.getAvailableThemes();
      
      expect(availableThemes).toContain('hacker');
      expect(availableThemes).toContain('neon');
      expect(availableThemes).toContain('classic');
      expect(availableThemes).toContain('matrix');
      expect(availableThemes).toContain('cyberpunk');
      expect(availableThemes).toContain('retro');
      expect(availableThemes).toContain('dark');
      expect(availableThemes).toContain('rainbow');
      expect(availableThemes).toHaveLength(8);
    });
  });

  describe('theme properties', () => {
    test('should have all required properties for each theme', () => {
      const requiredProperties = [
        'banner', 'subtitle', 'text', 'accent', 'code', 
        'progress', 'transition', 'heading', 'list'
      ];

      for (const themeName of themes.getAvailableThemes()) {
        const theme = themes.getTheme(themeName);
        
        for (const prop of requiredProperties) {
          expect(theme).toHaveProperty(prop);
          expect(theme[prop]).toBeDefined();
        }
      }
    });

    test('should have valid color values', () => {
      const validColors = [
        'green', 'cyan', 'magenta', 'blue', 'yellow', 
        'white', 'red', 'gray', 'black'
      ];

      for (const themeName of themes.getAvailableThemes()) {
        const theme = themes.getTheme(themeName);
        
        for (const [key, value] of Object.entries(theme)) {
          if (typeof value === 'string') {
            expect(validColors).toContain(value);
          }
        }
      }
    });
  });

  describe('theme descriptions', () => {
    test('should have descriptions for all themes', () => {
      const descriptions = themes.getThemeDescriptions();
      
      expect(descriptions).toHaveProperty('hacker');
      expect(descriptions).toHaveProperty('neon');
      expect(descriptions).toHaveProperty('classic');
      expect(descriptions).toHaveProperty('matrix');
      expect(descriptions).toHaveProperty('cyberpunk');
      expect(descriptions).toHaveProperty('retro');
      expect(descriptions).toHaveProperty('dark');
      expect(descriptions).toHaveProperty('rainbow');
    });

    test('should return hacker theme description', () => {
      const descriptions = themes.getThemeDescriptions();
      expect(descriptions.hacker).toBe('Cybersecurity vibes');
    });

    test('should return neon theme description', () => {
      const descriptions = themes.getThemeDescriptions();
      expect(descriptions.neon).toBe('Cyberpunk aesthetic');
    });

    test('should return classic theme description', () => {
      const descriptions = themes.getThemeDescriptions();
      expect(descriptions.classic).toBe('Professional');
    });

    test('should return matrix theme description', () => {
      const descriptions = themes.getThemeDescriptions();
      expect(descriptions.matrix).toBe('Matrix-style');
    });

    test('should return cyberpunk theme description', () => {
      const descriptions = themes.getThemeDescriptions();
      expect(descriptions.cyberpunk).toBe('Futuristic');
    });

    test('should return retro theme description', () => {
      const descriptions = themes.getThemeDescriptions();
      expect(descriptions.retro).toBe('Vintage terminal');
    });

    test('should return dark theme description', () => {
      const descriptions = themes.getThemeDescriptions();
      expect(descriptions.dark).toBe('Minimalist');
    });

    test('should return rainbow theme description', () => {
      const descriptions = themes.getThemeDescriptions();
      expect(descriptions.rainbow).toBe('Fun & vibrant');
    });
  });
});
