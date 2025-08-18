import { jest } from '@jest/globals';
import { readmeCinema } from '../src/index.js';

// Mock all dependencies
jest.mock('fs-extra');
jest.mock('marked');
jest.mock('../src/ascii-banner.js');
jest.mock('../src/typewriter-effect.js');
jest.mock('../src/section-transitions.js');
jest.mock('../src/syntax-highlighter.js');
jest.mock('../src/progress-bars.js');
jest.mock('../src/color-themes.js');

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

describe('readmeCinema', () => {
  let mockFs;
  let mockMarked;
  let mockAsciiBanner;
  let mockTypewriterEffect;
  let mockSectionTransitions;
  let mockSyntaxHighlighter;
  let mockProgressBars;
  let mockColorThemes;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup fs-extra mock
    mockFs = {
      readFile: jest.fn().mockResolvedValue('# Test README\n\nThis is a test.')
    };
    require('fs-extra').default = mockFs;

    // Setup marked mock
    mockMarked = {
      marked: jest.fn().mockReturnValue([
        { type: 'heading', text: 'Test README' },
        { type: 'paragraph', text: 'This is a test.' }
      ])
    };
    require('marked').marked = mockMarked.marked;

    // Setup component mocks
    mockAsciiBanner = {
      display: jest.fn().mockResolvedValue()
    };
    require('../src/ascii-banner.js').AsciiBanner = jest.fn().mockImplementation(() => mockAsciiBanner);

    mockTypewriterEffect = {
      type: jest.fn().mockResolvedValue()
    };
    require('../src/typewriter-effect.js').TypewriterEffect = jest.fn().mockImplementation(() => mockTypewriterEffect);

    mockSectionTransitions = {
      transition: jest.fn().mockResolvedValue()
    };
    require('../src/section-transitions.js').SectionTransitions = jest.fn().mockImplementation(() => mockSectionTransitions);

    mockSyntaxHighlighter = {
      highlight: jest.fn().mockReturnValue('highlighted code'),
      highlightInline: jest.fn().mockReturnValue('highlighted inline')
    };
    require('../src/syntax-highlighter.js').SyntaxHighlighter = jest.fn().mockImplementation(() => mockSyntaxHighlighter);

    mockProgressBars = {
      showFeatureProgress: jest.fn().mockResolvedValue()
    };
    require('../src/progress-bars.js').ProgressBars = jest.fn().mockImplementation(() => mockProgressBars);

    mockColorThemes = {
      getTheme: jest.fn().mockReturnValue({
        banner: 'green',
        subtitle: 'cyan',
        text: 'white',
        accent: 'green',
        code: 'yellow',
        progress: 'green',
        transition: 'green',
        heading: 'green',
        list: 'cyan'
      })
    };
    require('../src/color-themes.js').ColorThemes = jest.fn().mockImplementation(() => mockColorThemes);
  });

  describe('basic functionality', () => {
    test('should process README file successfully', async () => {
      await readmeCinema('./test.md');
      
      expect(mockFs.readFile).toHaveBeenCalledWith('./test.md', 'utf-8');
      expect(mockMarked.marked).toHaveBeenCalled();
      expect(mockAsciiBanner.display).toHaveBeenCalled();
    });

    test('should use default options when none provided', async () => {
      await readmeCinema('./test.md');
      
      expect(mockColorThemes.getTheme).toHaveBeenCalledWith('hacker');
      expect(require('../src/typewriter-effect.js').TypewriterEffect).toHaveBeenCalledWith(50, expect.any(Object));
    });

    test('should use custom options when provided', async () => {
      const options = {
        speed: 100,
        color: 'neon',
        progress: true,
        transitions: true
      };
      
      await readmeCinema('./test.md', options);
      
      expect(mockColorThemes.getTheme).toHaveBeenCalledWith('neon');
      expect(require('../src/typewriter-effect.js').TypewriterEffect).toHaveBeenCalledWith(100, expect.any(Object));
    });
  });

  describe('markdown token processing', () => {
    test('should handle heading tokens', async () => {
      mockMarked.marked.mockReturnValue([
        { type: 'heading', text: 'Test Heading' }
      ]);
      
      await readmeCinema('./test.md');
      
      expect(mockTypewriterEffect.type).toHaveBeenCalledWith('Test Heading', 'green');
    });

    test('should handle paragraph tokens', async () => {
      mockMarked.marked.mockReturnValue([
        { type: 'paragraph', text: 'Test paragraph' }
      ]);
      
      await readmeCinema('./test.md');
      
      expect(mockTypewriterEffect.type).toHaveBeenCalledWith('Test paragraph', 'white');
    });

    test('should handle code tokens', async () => {
      mockMarked.marked.mockReturnValue([
        { type: 'code', text: 'console.log("test")', lang: 'javascript' }
      ]);
      
      await readmeCinema('./test.md');
      
      expect(mockSyntaxHighlighter.highlight).toHaveBeenCalledWith('console.log("test")', 'javascript');
    });

    test('should handle code tokens without language', async () => {
      mockMarked.marked.mockReturnValue([
        { type: 'code', text: 'plain code' }
      ]);
      
      await readmeCinema('./test.md');
      
      expect(mockSyntaxHighlighter.highlight).toHaveBeenCalledWith('plain code', undefined);
    });

    test('should handle list tokens', async () => {
      mockMarked.marked.mockReturnValue([
        { type: 'list', items: ['Item 1', 'Item 2'] }
      ]);
      
      await readmeCinema('./test.md');
      
      expect(mockTypewriterEffect.type).toHaveBeenCalledWith('• Item 1', 'cyan');
      expect(mockTypewriterEffect.type).toHaveBeenCalledWith('• Item 2', 'cyan');
    });

    test('should handle blockquote tokens', async () => {
      mockMarked.marked.mockReturnValue([
        { type: 'blockquote', text: 'Test quote' }
      ]);
      
      await readmeCinema('./test.md');
      
      expect(mockTypewriterEffect.type).toHaveBeenCalledWith('> Test quote', 'gray');
    });

    test('should handle hr tokens', async () => {
      mockMarked.marked.mockReturnValue([
        { type: 'hr' }
      ]);
      
      await readmeCinema('./test.md');
      
      expect(console.log).toHaveBeenCalled();
    });

    test('should handle unknown token types', async () => {
      mockMarked.marked.mockReturnValue([
        { type: 'unknown', text: 'Unknown content' }
      ]);
      
      await readmeCinema('./test.md');
      
      expect(mockTypewriterEffect.type).toHaveBeenCalledWith('Unknown content', 'white');
    });
  });

  describe('progress bars', () => {
    test('should show progress bars when enabled', async () => {
      const options = { progress: true };
      
      await readmeCinema('./test.md', options);
      
      expect(mockProgressBars.showFeatureProgress).toHaveBeenCalled();
    });

    test('should not show progress bars when disabled', async () => {
      const options = { progress: false };
      
      await readmeCinema('./test.md', options);
      
      expect(mockProgressBars.showFeatureProgress).not.toHaveBeenCalled();
    });
  });

  describe('section transitions', () => {
    test('should show transitions when enabled', async () => {
      const options = { transitions: true };
      
      await readmeCinema('./test.md', options);
      
      expect(mockSectionTransitions.transition).toHaveBeenCalled();
    });

    test('should not show transitions when disabled', async () => {
      const options = { transitions: false };
      
      await readmeCinema('./test.md', options);
      
      expect(mockSectionTransitions.transition).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    test('should handle file read errors', async () => {
      mockFs.readFile.mockRejectedValue(new Error('File not found'));
      
      await expect(readmeCinema('./nonexistent.md')).rejects.toThrow('File not found');
    });

    test('should handle markdown parsing errors', async () => {
      mockMarked.marked.mockImplementation(() => {
        throw new Error('Parse error');
      });
      
      await expect(readmeCinema('./test.md')).rejects.toThrow('Parse error');
    });
  });

  describe('color theme handling', () => {
    test('should handle unknown color themes', async () => {
      const options = { color: 'unknown' };
      
      await readmeCinema('./test.md', options);
      
      expect(mockColorThemes.getTheme).toHaveBeenCalledWith('unknown');
    });

    test('should handle case insensitive theme names', async () => {
      const options = { color: 'HACKER' };
      
      await readmeCinema('./test.md', options);
      
      expect(mockColorThemes.getTheme).toHaveBeenCalledWith('HACKER');
    });
  });

  describe('speed handling', () => {
    test('should handle string speed values', async () => {
      const options = { speed: '75' };
      
      await readmeCinema('./test.md', options);
      
      expect(require('../src/typewriter-effect.js').TypewriterEffect).toHaveBeenCalledWith(75, expect.any(Object));
    });

    test('should handle numeric speed values', async () => {
      const options = { speed: 25 };
      
      await readmeCinema('./test.md', options);
      
      expect(require('../src/typewriter-effect.js').TypewriterEffect).toHaveBeenCalledWith(25, expect.any(Object));
    });
  });
});
