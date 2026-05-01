import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import {
  ColorThemes,
  getAvailableThemes,
  getFeatureProgress,
  isFeatureItem,
  isMajorSection,
  readmeCinema,
  resolveTheme
} from '../index.js';
import { createMockOutput } from './helpers.js';

describe('readmeCinema core', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'readme-cinema-'));
  });

  afterEach(async () => {
    await fs.remove(tempDir);
  });

  async function writeReadme(markdown) {
    const filePath = path.join(tempDir, 'README.md');
    await fs.writeFile(filePath, markdown);
    return filePath;
  }

  test('renders markdown tokens with deterministic options', async () => {
    const filePath = await writeReadme(`# Projector

Welcome to the show.

## Features

- Fast feature support
- Customizable integration

> Roll credits

\`\`\`
plain code
\`\`\`

\`\`\`js
const show = true;
\`\`\`

1. Ordered item

<div>raw html</div>
`);
    const { output, writes } = createMockOutput();

    const summary = await readmeCinema(filePath, {
      color: 'neon',
      speed: 0,
      progress: true,
      transitions: false,
      banner: false,
      completionMessage: true,
      output,
      instant: true
    });

    const rendered = writes.join('');
    expect(summary).toEqual({
      filePath,
      theme: 'neon',
      tokensProcessed: expect.any(Number)
    });
    expect(rendered).toContain('# Projector');
    expect(rendered).toContain('Fast feature support');
    expect(rendered).toContain('```js');
    expect(rendered).toContain('raw html');
    expect(rendered).toContain('Roll credits');
    expect(rendered).toContain('README Cinema Complete');
    expect(rendered).toContain('%');
  });

  test('renders banner and selected transition when enabled', async () => {
    const filePath = await writeReadme(`# First

Intro.

## Second

More text.
`);
    const { output, writes, logs } = createMockOutput();

    await readmeCinema(filePath, {
      banner: true,
      transitions: true,
      completionMessage: false,
      output,
      random: () => 0,
      instant: true
    });

    expect(writes.join('')).toContain('SCENE TRANSITION');
    expect(logs.join('\n')).toContain('██████');
  });

  test('falls back to hacker theme for unknown theme names', async () => {
    const filePath = await writeReadme('# Title');
    const { output } = createMockOutput();

    const summary = await readmeCinema(filePath, {
      color: 'unknown',
      banner: false,
      clearScreen: false,
      completionMessage: false,
      output,
      instant: true
    });

    expect(summary.theme).toBe('hacker');
    expect(resolveTheme('unknown')).toEqual({
      name: 'hacker',
      theme: ColorThemes.hacker
    });
  });

  test('wraps file and path failures with useful errors', async () => {
    await expect(readmeCinema('', { instant: true })).rejects.toThrow('file path is required');
    await expect(readmeCinema(path.join(tempDir, 'missing.md'), { instant: true })).rejects.toThrow(
      'Failed to process README'
    );
  });

  test('exports theme and feature helpers', () => {
    expect(getAvailableThemes()).toEqual(expect.arrayContaining(['hacker', 'neon', 'rainbow']));
    expect(isMajorSection({ type: 'heading', depth: 2 }, { type: 'paragraph' })).toBe(true);
    expect(isMajorSection({ type: 'heading', depth: 3 }, { type: 'paragraph' })).toBe(false);
    expect(isFeatureItem('Fast integration support')).toBe(true);
    expect(isFeatureItem('Plain sentence')).toBe(false);
    expect(getFeatureProgress('Fast integration support')).toBeGreaterThanOrEqual(60);
    expect(getFeatureProgress('Fast integration support')).toBeLessThanOrEqual(100);
  });
});
