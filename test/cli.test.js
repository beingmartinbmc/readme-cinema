import { jest } from '@jest/globals';
import { execSync } from 'child_process';
import fs from 'fs-extra';

// Mock fs-extra
jest.mock('fs-extra');

// Mock the main readmeCinema function
jest.mock('../src/index.js', () => ({
  readmeCinema: jest.fn().mockResolvedValue()
}));

describe('CLI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.exit = jest.fn();
  });

  describe('help command', () => {
    test('should show help information', () => {
      const output = execSync('node bin/cli.js --help', { encoding: 'utf8' });
      
      expect(output).toContain('readme-cinema');
      expect(output).toContain('Transform your README files');
      expect(output).toContain('--help');
      expect(output).toContain('--version');
      expect(output).toContain('--speed');
      expect(output).toContain('--color');
      expect(output).toContain('--progress');
      expect(output).toContain('--transitions');
    });

    test('should show all color themes in help', () => {
      const output = execSync('node bin/cli.js --help', { encoding: 'utf8' });
      
      expect(output).toContain('hacker, neon, classic, matrix, cyberpunk, retro, dark, rainbow');
    });
  });

  describe('version command', () => {
    test('should show version information', () => {
      const output = execSync('node bin/cli.js --version', { encoding: 'utf8' });
      
      expect(output).toContain('1.0.0');
    });
  });

  describe('file validation', () => {
    test('should validate file exists before processing', async () => {
      // Mock fs.pathExists to return false
      fs.pathExists.mockResolvedValue(false);
      
      // Mock console.error to capture output
      const originalError = console.error;
      const mockError = jest.fn();
      console.error = mockError;
      
      // Mock console.log to capture output
      const originalLog = console.log;
      const mockLog = jest.fn();
      console.log = mockLog;
      
      try {
        execSync('node bin/cli.js nonexistent.md', { encoding: 'utf8' });
      } catch (error) {
        // Expected to fail
      }
      
      expect(mockError).toHaveBeenCalledWith("❌ Error: File 'nonexistent.md' not found");
      expect(mockLog).toHaveBeenCalledWith('💡 Try: readme-cinema --help for usage information');
      
      // Restore console methods
      console.error = originalError;
      console.log = originalLog;
    });

    test('should process file when it exists', async () => {
      // Mock fs.pathExists to return true
      fs.pathExists.mockResolvedValue(true);
      
      // Mock fs.readFile to return content
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      execSync('node bin/cli.js test.md', { encoding: 'utf8' });
      
      expect(fs.pathExists).toHaveBeenCalledWith('test.md');
    });
  });

  describe('argument handling', () => {
    test('should use default file when no argument provided', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      execSync('node bin/cli.js', { encoding: 'utf8' });
      
      expect(fs.pathExists).toHaveBeenCalledWith('./README.md');
    });

    test('should use provided file argument', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      execSync('node bin/cli.js custom.md', { encoding: 'utf8' });
      
      expect(fs.pathExists).toHaveBeenCalledWith('custom.md');
    });
  });

  describe('option handling', () => {
    test('should pass speed option correctly', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      execSync('node bin/cli.js test.md --speed 100', { encoding: 'utf8' });
      
      // The speed option should be passed to readmeCinema
      expect(fs.pathExists).toHaveBeenCalledWith('test.md');
    });

    test('should pass color option correctly', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      execSync('node bin/cli.js test.md --color neon', { encoding: 'utf8' });
      
      expect(fs.pathExists).toHaveBeenCalledWith('test.md');
    });

    test('should pass progress option correctly', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      execSync('node bin/cli.js test.md --progress', { encoding: 'utf8' });
      
      expect(fs.pathExists).toHaveBeenCalledWith('test.md');
    });

    test('should pass transitions option correctly', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      execSync('node bin/cli.js test.md --transitions', { encoding: 'utf8' });
      
      expect(fs.pathExists).toHaveBeenCalledWith('test.md');
    });

    test('should handle multiple options together', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      execSync('node bin/cli.js test.md --speed 75 --color matrix --progress --transitions', { encoding: 'utf8' });
      
      expect(fs.pathExists).toHaveBeenCalledWith('test.md');
    });
  });

  describe('error handling', () => {
    test('should handle file read errors gracefully', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockRejectedValue(new Error('Permission denied'));
      
      // Mock console.error to capture output
      const originalError = console.error;
      const mockError = jest.fn();
      console.error = mockError;
      
      // Mock console.log to capture output
      const originalLog = console.log;
      const mockLog = jest.fn();
      console.log = mockLog;
      
      try {
        execSync('node bin/cli.js test.md', { encoding: 'utf8' });
      } catch (error) {
        // Expected to fail
      }
      
      expect(mockError).toHaveBeenCalledWith('❌ Error:', 'Permission denied');
      expect(mockLog).toHaveBeenCalledWith('💡 Try: readme-cinema --help for usage information');
      
      // Restore console methods
      console.error = originalError;
      console.log = originalLog;
    });

    test('should handle general errors gracefully', () => {
      fs.pathExists.mockRejectedValue(new Error('Unexpected error'));
      
      // Mock console.error to capture output
      const originalError = console.error;
      const mockError = jest.fn();
      console.error = mockError;
      
      // Mock console.log to capture output
      const originalLog = console.log;
      const mockLog = jest.fn();
      console.log = mockLog;
      
      try {
        execSync('node bin/cli.js test.md', { encoding: 'utf8' });
      } catch (error) {
        // Expected to fail
      }
      
      expect(mockError).toHaveBeenCalledWith('❌ Error:', 'Unexpected error');
      expect(mockLog).toHaveBeenCalledWith('💡 Try: readme-cinema --help for usage information');
      
      // Restore console methods
      console.error = originalError;
      console.log = originalLog;
    });
  });

  describe('option validation', () => {
    test('should accept valid speed values', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      // Test various valid speed values
      const validSpeeds = ['10', '50', '100', '200'];
      
      validSpeeds.forEach(speed => {
        expect(() => {
          execSync(`node bin/cli.js test.md --speed ${speed}`, { encoding: 'utf8' });
        }).not.toThrow();
      });
    });

    test('should accept valid color themes', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      // Test all valid color themes
      const validColors = ['hacker', 'neon', 'classic', 'matrix', 'cyberpunk', 'retro', 'dark', 'rainbow'];
      
      validColors.forEach(color => {
        expect(() => {
          execSync(`node bin/cli.js test.md --color ${color}`, { encoding: 'utf8' });
        }).not.toThrow();
      });
    });

    test('should accept unknown color themes gracefully', () => {
      fs.pathExists.mockResolvedValue(true);
      fs.readFile.mockResolvedValue('# Test README\n\nThis is a test.');
      
      expect(() => {
        execSync('node bin/cli.js test.md --color unknown', { encoding: 'utf8' });
      }).not.toThrow();
    });
  });
});
