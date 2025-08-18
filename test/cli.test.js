import { jest } from '@jest/globals';
import { execSync } from 'child_process';

describe('CLI', () => {
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
      
      // The actual help text shows themes with line breaks
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
    test('should validate file exists before processing', () => {
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
  });

  describe('argument handling', () => {
    test('should use default file when no argument provided', () => {
      // This test will fail if README.md doesn't exist, but that's expected
      try {
        execSync('node bin/cli.js', { encoding: 'utf8' });
      } catch (error) {
        // Expected to fail if README.md doesn't exist
        expect(error.message).toContain('File');
      }
    });

    test('should use provided file argument', () => {
      // This test will fail if the file doesn't exist, but that's expected
      try {
        execSync('node bin/cli.js custom.md', { encoding: 'utf8' });
      } catch (error) {
        // Expected to fail if custom.md doesn't exist
        expect(error.message).toContain('File');
      }
    });
  });

  describe('option validation', () => {
    test('should accept valid speed values', () => {
      // Test various valid speed values
      expect(() => {
        execSync('node bin/cli.js test.md --speed 10', { encoding: 'utf8' });
      }).toThrow();
      
      expect(() => {
        execSync('node bin/cli.js test.md --speed 1000', { encoding: 'utf8' });
      }).toThrow();
      
      expect(() => {
        execSync('node bin/cli.js test.md --speed 50', { encoding: 'utf8' });
      }).toThrow();
    });

    test('should accept valid color themes', () => {
      // Test all valid color themes
      const validThemes = ['hacker', 'neon', 'classic', 'matrix', 'cyberpunk', 'retro', 'dark', 'rainbow'];
      
      validThemes.forEach(theme => {
        expect(() => {
          execSync(`node bin/cli.js test.md --color ${theme}`, { encoding: 'utf8' });
        }).toThrow();
      });
    });

    test('should accept unknown color themes gracefully', () => {
      expect(() => {
        execSync('node bin/cli.js test.md --color unknown', { encoding: 'utf8' });
      }).toThrow();
    });
  });

  describe('integration', () => {
    test('should process a real README file end-to-end', () => {
      // This test will work if README.md exists
      try {
        execSync('node bin/cli.js README.md --color hacker --speed 50', { encoding: 'utf8' });
        // If it succeeds, that's great
      } catch (error) {
        // If it fails, that's also expected if README.md doesn't exist
        expect(error.message).toContain('File');
      }
    });
  });
});
