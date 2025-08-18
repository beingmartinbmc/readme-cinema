import { execSync } from 'child_process';

describe('README Cinema CLI', () => {
  test('should show help information', () => {
    const output = execSync('node bin/cli.js --help', { encoding: 'utf8' });
    expect(output).toContain('readme-cinema');
    expect(output).toContain('Transform your README files');
    expect(output).toContain('--help');
  });

  test('should show version information', () => {
    const output = execSync('node bin/cli.js --version', { encoding: 'utf8' });
    expect(output).toContain('1.0.0');
  });

  test('should accept valid options', () => {
    const output = execSync('node bin/cli.js --help', { encoding: 'utf8' });
    expect(output).toContain('--speed');
    expect(output).toContain('--color');
    expect(output).toContain('--progress');
  });
});
