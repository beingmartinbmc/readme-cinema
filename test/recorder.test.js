import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import {
  buildCastEvents,
  buildCastHeader,
  castToGif,
  castToSvg,
  generateDemo,
  isToolAvailable,
  recordToCast,
  stripAnsi
} from '../src/recorder.js';

describe('recorder', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'readme-cinema-rec-'));
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  test('stripAnsi removes ANSI escape sequences', () => {
    expect(stripAnsi('\x1B[32mgreen\x1B[0m')).toBe('green');
    expect(stripAnsi('\x1B[1;31mred bold\x1B[0m')).toBe('red bold');
    expect(stripAnsi('no escapes')).toBe('no escapes');
    expect(stripAnsi('\x1B]0;title\x07rest')).toBe('rest');
    expect(stripAnsi('')).toBe('');
  });

  test('buildCastHeader produces valid asciinema v2 header', () => {
    const header = buildCastHeader(100, 30);
    const parsed = JSON.parse(header);

    expect(parsed.version).toBe(2);
    expect(parsed.width).toBe(100);
    expect(parsed.height).toBe(30);
    expect(parsed.timestamp).toBeGreaterThan(0);
    expect(parsed.env.TERM).toBe('xterm-256color');
  });

  test('buildCastHeader uses defaults', () => {
    const parsed = JSON.parse(buildCastHeader());
    expect(parsed.width).toBe(80);
    expect(parsed.height).toBe(24);
  });

  test('buildCastEvents creates timed event entries', () => {
    const chunks = ['hello', ' ', 'world'];
    const events = buildCastEvents(chunks, 0.1);

    expect(events).toHaveLength(3);

    const first = JSON.parse(events[0]);
    expect(first[0]).toBe(0);
    expect(first[1]).toBe('o');
    expect(first[2]).toBe('hello');

    const second = JSON.parse(events[1]);
    expect(second[0]).toBeCloseTo(0.1, 5);

    const third = JSON.parse(events[2]);
    expect(third[0]).toBeCloseTo(0.2, 5);
  });

  test('buildCastEvents handles empty array', () => {
    const events = buildCastEvents([]);
    expect(events).toHaveLength(0);
  });

  test('buildCastEvents uses default frameDuration', () => {
    const events = buildCastEvents(['a', 'b']);
    const second = JSON.parse(events[1]);
    expect(second[0]).toBeCloseTo(0.04, 5);
  });

  test('recordToCast renders a README into a .cast file', async () => {
    const readmePath = path.join(tempDir, 'README.md');
    await fs.writeFile(readmePath, '# Hello\n\nWorld');

    const castPath = path.join(tempDir, 'output.cast');
    const result = await recordToCast(readmePath, {
      castPath,
      banner: false,
      transitions: false,
      completionMessage: false,
      width: 80,
      height: 24
    });

    expect(result.outputPath).toBe(castPath);
    expect(result.eventCount).toBeGreaterThan(0);

    const content = await fs.readFile(castPath, 'utf-8');
    const lines = content.trim().split('\n');

    const header = JSON.parse(lines[0]);
    expect(header.version).toBe(2);
    expect(header.width).toBe(80);

    const firstEvent = JSON.parse(lines[1]);
    expect(firstEvent[1]).toBe('o');
  });

  test('recordToCast uses readmePath override', async () => {
    const readmePath = path.join(tempDir, 'MY.md');
    await fs.writeFile(readmePath, '# Custom');

    const castPath = path.join(tempDir, 'custom.cast');
    const result = await recordToCast('ignored', {
      readmePath,
      castPath,
      banner: false,
      completionMessage: false
    });

    expect(result.outputPath).toBe(castPath);
    expect(result.eventCount).toBeGreaterThan(0);
  });

  test('recordToCast defaults output path from input', async () => {
    const readmePath = path.join(tempDir, 'demo.md');
    await fs.writeFile(readmePath, '# Demo');

    const result = await recordToCast(readmePath, {
      banner: false,
      completionMessage: false
    });

    expect(result.outputPath).toBe(readmePath.replace('.md', '.cast'));
    await fs.remove(result.outputPath);
  });

  test('isToolAvailable returns true for common tools', () => {
    expect(isToolAvailable('node')).toBe(true);
    expect(isToolAvailable('agg-nonexistent-tool-xyz')).toBe(false);
  });

  test('castToGif rejects when agg is not installed', async () => {
    const castFile = path.join(tempDir, 'input.cast');
    await fs.writeFile(castFile, buildCastHeader() + '\n');

    await expect(
      castToGif(castFile, path.join(tempDir, 'out.gif'))
    ).rejects.toThrow(/agg/i);
  });

  test('castToSvg rejects when svg-term is not installed', async () => {
    const castFile = path.join(tempDir, 'input.cast');
    await fs.writeFile(castFile, buildCastHeader() + '\n');

    await expect(
      castToSvg(castFile, path.join(tempDir, 'out.svg'))
    ).rejects.toThrow(/svg-term/i);
  });

  test('generateDemo produces a .cast file', async () => {
    const readmePath = path.join(tempDir, 'README.md');
    await fs.writeFile(readmePath, '# Demo\n\nHello world');

    const castPath = path.join(tempDir, 'demo.cast');
    const result = await generateDemo(readmePath, castPath, {
      format: 'cast',
      banner: false,
      completionMessage: false,
      width: 80,
      height: 24
    });

    expect(result.format).toBe('cast');
    expect(result.outputPath).toBe(castPath);
    expect(result.eventCount).toBeGreaterThan(0);
    expect(await fs.pathExists(castPath)).toBe(true);
  });

  test('generateDemo rejects for gif when agg is missing', async () => {
    const readmePath = path.join(tempDir, 'README.md');
    await fs.writeFile(readmePath, '# GIF');

    await expect(
      generateDemo(readmePath, path.join(tempDir, 'out.gif'), {
        format: 'gif',
        banner: false,
        completionMessage: false
      })
    ).rejects.toThrow(/agg/i);
  });

  test('generateDemo rejects for svg when svg-term is missing', async () => {
    const readmePath = path.join(tempDir, 'README.md');
    await fs.writeFile(readmePath, '# SVG');

    await expect(
      generateDemo(readmePath, path.join(tempDir, 'out.svg'), {
        format: 'svg',
        banner: false,
        completionMessage: false
      })
    ).rejects.toThrow(/svg-term/i);
  });

  test('generateDemo rejects unsupported format', async () => {
    const readmePath = path.join(tempDir, 'README.md');
    await fs.writeFile(readmePath, '# Bad');

    await expect(
      generateDemo(readmePath, path.join(tempDir, 'out.mp4'), {
        format: 'mp4',
        banner: false,
        completionMessage: false
      })
    ).rejects.toThrow('Unsupported format');
  });

  test('recordToCast captures clear screen escape', async () => {
    const readmePath = path.join(tempDir, 'README.md');
    await fs.writeFile(readmePath, '# Hi');
    const castPath = path.join(tempDir, 'clear.cast');

    await recordToCast(readmePath, {
      castPath,
      banner: false,
      completionMessage: false,
      clearScreen: true
    });

    const content = await fs.readFile(castPath, 'utf-8');
    expect(content).toContain('\\u001b[2J');
  });
});
