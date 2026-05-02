import fs from 'fs-extra';
import { jest } from '@jest/globals';
import os from 'os';
import path from 'path';
import { createProgram, parseSpeed, runCli } from '../src/cli.js';
import { getAvailableThemes } from '../src/index.js';
import { getAvailablePresets } from '../src/presets.js';
import { createMockOutput } from './helpers.js';

describe('CLI program', () => {
  let tempDir;
  let previousExitCode;

  beforeEach(async () => {
    previousExitCode = process.exitCode;
    process.exitCode = undefined;
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'readme-cinema-cli-'));
  });

  afterEach(async () => {
    process.exitCode = previousExitCode;
    await fs.remove(tempDir);
  });

  test('passes parsed options to the rendering action', async () => {
    const filePath = path.join(tempDir, 'README.md');
    await fs.writeFile(filePath, '# CLI');
    const action = jest.fn().mockResolvedValue();
    const { output } = createMockOutput();

    await createProgram({ action, output }).parseAsync([
      'node',
      'readme-cinema',
      filePath,
      '--speed',
      '0',
      '--color',
      'neon',
      '--progress',
      '--no-transitions',
      '--no-banner',
      '--no-clear',
      '--instant'
    ]);

    expect(action).toHaveBeenCalledWith(filePath, {
      speed: 0,
      color: 'neon',
      progress: true,
      transitions: false,
      banner: false,
      clearScreen: false,
      instant: true
    });
  });

  test('lists themes without reading a file', async () => {
    const action = jest.fn();
    const { output, logs } = createMockOutput();

    await createProgram({ action, output }).parseAsync(['node', 'readme-cinema', '--list-themes']);

    expect(action).not.toHaveBeenCalled();
    expect(logs.join('\n')).toContain(getAvailableThemes()[0]);
  });

  test('lists presets without reading a file', async () => {
    const action = jest.fn();
    const { output, logs } = createMockOutput();

    await createProgram({ action, output }).parseAsync(['node', 'readme-cinema', '--list-presets']);

    expect(action).not.toHaveBeenCalled();
    const logOutput = logs.join('\n');
    for (const preset of getAvailablePresets()) {
      expect(logOutput).toContain(preset);
    }
  });

  test('applies preset options when --preset is used', async () => {
    const filePath = path.join(tempDir, 'README.md');
    await fs.writeFile(filePath, '# Preset');
    const action = jest.fn().mockResolvedValue();
    const { output } = createMockOutput();

    await createProgram({ action, output }).parseAsync([
      'node',
      'readme-cinema',
      filePath,
      '--preset',
      'dramatic'
    ]);

    expect(action).toHaveBeenCalledWith(
      filePath,
      expect.objectContaining({
        speed: 80,
        color: 'cyberpunk',
        progress: true
      })
    );
  });

  test('reports unknown presets', async () => {
    const action = jest.fn();
    const { output, errors } = createMockOutput();

    await createProgram({ action, output }).parseAsync([
      'node',
      'readme-cinema',
      'README.md',
      '--preset',
      'nonexistent'
    ]);

    expect(errors.join('\n')).toContain("Unknown preset 'nonexistent'");
    expect(process.exitCode).toBe(1);
    expect(action).not.toHaveBeenCalled();
  });

  test('reports missing files and unknown themes', async () => {
    const action = jest.fn();
    const { output, errors, logs } = createMockOutput();

    await createProgram({ action, output }).parseAsync(['node', 'readme-cinema', 'missing.md']);
    expect(errors.join('\n')).toContain("File 'missing.md' not found");
    expect(logs.join('\n')).toContain('readme-cinema --help');
    expect(process.exitCode).toBe(1);

    process.exitCode = undefined;
    await createProgram({ action, output }).parseAsync([
      'node',
      'readme-cinema',
      'README.md',
      '--color',
      'unknown'
    ]);
    expect(errors.join('\n')).toContain("Unknown color theme 'unknown'");
    expect(process.exitCode).toBe(1);
  });

  test('parses speeds as non-negative integers', () => {
    expect(parseSpeed('0')).toBe(0);
    expect(parseSpeed('120')).toBe(120);
    expect(() => parseSpeed('-1')).toThrow('non-negative integer');
    expect(() => parseSpeed('1.5')).toThrow('non-negative integer');
    expect(() => parseSpeed('fast')).toThrow('non-negative integer');
  });

  test('exports .cast file via --cast flag', async () => {
    const filePath = path.join(tempDir, 'README.md');
    await fs.writeFile(filePath, '# Cast Test');
    const castPath = path.join(tempDir, 'output.cast');
    const { output, logs } = createMockOutput();

    await createProgram({ output }).parseAsync([
      'node',
      'readme-cinema',
      filePath,
      '--cast',
      castPath,
      '--no-banner'
    ]);

    const logOutput = logs.join('\n');
    expect(logOutput).toContain('Recording CAST demo');
    expect(logOutput).toContain('Saved CAST to');
    expect(await fs.pathExists(castPath)).toBe(true);
  });

  test('export uses default output name when flag has no value', async () => {
    const filePath = path.join(tempDir, 'README.md');
    await fs.writeFile(filePath, '# Default output');
    const { output, logs } = createMockOutput();

    await createProgram({ output }).parseAsync([
      'node',
      'readme-cinema',
      filePath,
      '--cast',
      '--no-banner'
    ]);

    expect(logs.join('\n')).toContain('Saved CAST to');
    const expectedCast = filePath.replace('.md', '.cast');
    await fs.remove(expectedCast);
  });

  test('export fails gracefully when tool is missing', async () => {
    const filePath = path.join(tempDir, 'README.md');
    await fs.writeFile(filePath, '# GIF');
    const { output, errors } = createMockOutput();

    await createProgram({ output }).parseAsync([
      'node',
      'readme-cinema',
      filePath,
      '--gif',
      path.join(tempDir, 'out.gif'),
      '--no-banner'
    ]);

    expect(process.exitCode).toBe(1);
    expect(errors.join('\n')).toContain('Export failed');
  });

  test('writes help through fallback writer output', async () => {
    const writes = [];
    const program = createProgram({
      action: jest.fn(),
      output: {
        write: (text) => writes.push(text)
      }
    });

    program.exitOverride();

    await expect(program.parseAsync(['node', 'readme-cinema', '--help'])).rejects.toMatchObject({
      code: 'commander.helpDisplayed'
    });
    expect(writes.join('')).toContain('Usage: readme-cinema');
  });

  test('writes command errors through fallback writer output', async () => {
    const writes = [];
    const program = createProgram({
      action: jest.fn(),
      output: {
        write: (text) => writes.push(text)
      }
    });

    program.exitOverride();

    await expect(program.parseAsync(['node', 'readme-cinema', '--missing-option'])).rejects.toMatchObject({
      code: 'commander.unknownOption'
    });
    expect(writes.join('')).toContain('unknown option');
  });

  test('handles default program dependencies and silent output objects', async () => {
    const program = createProgram();
    expect(program.name()).toBe('readme-cinema');

    const silentProgram = createProgram({
      action: jest.fn(),
      output: {}
    });
    silentProgram.exitOverride();

    await expect(silentProgram.parseAsync(['node', 'readme-cinema', '--help'])).rejects.toMatchObject({
      code: 'commander.helpDisplayed'
    });
  });

  test('runCli builds and parses a program', async () => {
    const action = jest.fn();
    const { output, logs } = createMockOutput();

    await runCli(['node', 'readme-cinema', '--list-themes'], { action, output });

    expect(action).not.toHaveBeenCalled();
    expect(logs.join('\n')).toContain('hacker');
  });

  test('runCli supports default dependencies', async () => {
    const originalLog = console.log;
    console.log = jest.fn();

    try {
      await runCli(['node', 'readme-cinema', '--list-themes']);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('hacker'));
    } finally {
      console.log = originalLog;
    }
  });
});
