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

import { SyntaxHighlighter } from '../src/syntax-highlighter.js';

describe('SyntaxHighlighter', () => {
  let highlighter;
  let mockTheme;

  beforeEach(() => {
    mockTheme = {
      code: 'yellow'
    };
    highlighter = new SyntaxHighlighter(mockTheme);
    
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should initialize with theme and language colors', () => {
      expect(highlighter.theme).toBe(mockTheme);
      expect(highlighter.languageColors).toBeDefined();
      expect(highlighter.languageColors.javascript).toBe('yellow');
    });
  });

  describe('highlight', () => {
    test('should highlight JavaScript code', () => {
      const code = 'const x = 1;';
      const result = highlighter.highlight(code, 'javascript');
      
      expect(typeof result).toBe('string');
    });

    test('should highlight Python code', () => {
      const code = 'def hello(): pass';
      const result = highlighter.highlight(code, 'python');
      
      expect(typeof result).toBe('string');
    });

    test('should handle text without language', () => {
      const code = 'plain text';
      const result = highlighter.highlight(code);
      
      expect(typeof result).toBe('string');
    });

    test('should handle unknown language', () => {
      const code = 'some code';
      const result = highlighter.highlight(code, 'unknown');
      
      expect(typeof result).toBe('string');
    });

    test('should handle empty code', () => {
      const code = '';
      const result = highlighter.highlight(code, 'javascript');
      
      expect(typeof result).toBe('string');
      expect(result).toBe('');
    });
  });

  describe('getSyntaxPatterns', () => {
    test('should return patterns for JavaScript', () => {
      const patterns = highlighter.getSyntaxPatterns('javascript');
      
      expect(patterns).toBeInstanceOf(Array);
      expect(patterns.length).toBeGreaterThan(0);
      expect(patterns[0]).toHaveProperty('regex');
      expect(patterns[0]).toHaveProperty('color');
    });

    test('should return patterns for Python', () => {
      const patterns = highlighter.getSyntaxPatterns('python');
      
      expect(patterns).toBeInstanceOf(Array);
      expect(patterns.length).toBeGreaterThan(0);
    });

    test('should return patterns for HTML', () => {
      const patterns = highlighter.getSyntaxPatterns('html');
      
      expect(patterns).toBeInstanceOf(Array);
      expect(patterns.length).toBeGreaterThan(0);
    });

    test('should return patterns for CSS', () => {
      const patterns = highlighter.getSyntaxPatterns('css');
      
      expect(patterns).toBeInstanceOf(Array);
      expect(patterns.length).toBeGreaterThan(0);
    });

    test('should return patterns for JSON', () => {
      const patterns = highlighter.getSyntaxPatterns('json');
      
      expect(patterns).toBeInstanceOf(Array);
      expect(patterns.length).toBeGreaterThan(0);
    });

    test('should return patterns for YAML', () => {
      const patterns = highlighter.getSyntaxPatterns('yaml');
      
      expect(patterns).toBeInstanceOf(Array);
      expect(patterns.length).toBeGreaterThan(0);
    });

    test('should return patterns for bash', () => {
      const patterns = highlighter.getSyntaxPatterns('bash');
      
      expect(patterns).toBeInstanceOf(Array);
      expect(patterns.length).toBeGreaterThan(0);
    });

    test('should return empty array for unknown language', () => {
      const patterns = highlighter.getSyntaxPatterns('unknown');
      
      expect(patterns).toEqual([]);
    });
  });

  describe('highlightInline', () => {
    test('should highlight inline code', () => {
      const code = 'const x = 1';
      const result = highlighter.highlightInline(code, 'javascript');
      
      expect(typeof result).toBe('string');
      expect(result).toContain('const x = 1');
    });

    test('should handle unknown language for inline code', () => {
      const code = 'some code';
      const result = highlighter.highlightInline(code, 'unknown');
      
      expect(typeof result).toBe('string');
      expect(result).toContain('some code');
    });
  });

  describe('getLanguageColor', () => {
    test('should return color for known language', () => {
      const color = highlighter.getLanguageColor('javascript');
      expect(color).toBe('yellow');
    });

    test('should return default color for unknown language', () => {
      const color = highlighter.getLanguageColor('unknown');
      expect(color).toBe('yellow'); // default theme code color
    });

    test('should handle case insensitive language names', () => {
      const color = highlighter.getLanguageColor('JAVASCRIPT');
      expect(color).toBe('yellow');
    });
  });

  describe('language colors mapping', () => {
    test('should have correct colors for all supported languages', () => {
      const expectedColors = {
        javascript: 'yellow',
        js: 'yellow',
        typescript: 'blue',
        ts: 'blue',
        python: 'green',
        py: 'green',
        java: 'red',
        cpp: 'magenta',
        c: 'magenta',
        csharp: 'magenta',
        cs: 'magenta',
        php: 'cyan',
        ruby: 'red',
        go: 'cyan',
        rust: 'yellow',
        swift: 'red',
        kotlin: 'blue',
        html: 'red',
        css: 'blue',
        json: 'yellow',
        yaml: 'cyan',
        yml: 'cyan',
        markdown: 'white',
        md: 'white',
        bash: 'green',
        shell: 'green',
        sh: 'green',
        sql: 'cyan',
        xml: 'red',
        dockerfile: 'blue',
        docker: 'blue'
      };

      for (const [lang, expectedColor] of Object.entries(expectedColors)) {
        const color = highlighter.getLanguageColor(lang);
        expect(color).toBe(expectedColor);
      }
    });
  });
});
