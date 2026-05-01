import { jest } from '@jest/globals';
import { AsciiBanner } from '../src/ascii-banner.js';
import { ColorThemes } from '../src/color-themes.js';
import { ProgressBars } from '../src/progress-bars.js';
import { clampPercentage, colorize, createConsoleOutput, createRuntime, normalizeSpeed } from '../src/runtime.js';
import { SectionTransitions } from '../src/section-transitions.js';
import { SyntaxHighlighter } from '../src/syntax-highlighter.js';
import { TypewriterEffect } from '../src/typewriter-effect.js';
import { createInstantRuntime, createMockOutput } from './helpers.js';

describe('terminal effects', () => {
  const theme = ColorThemes.hacker;

  test('typewriter renders text variants and calculates natural delays', async () => {
    const { output, writes, logs } = createMockOutput();
    const typewriter = new TypewriterEffect('10', theme, createInstantRuntime(output));

    await typewriter.type('Hi\n7.', 'green');
    await typewriter.type('Default color');
    await typewriter.type('');
    await typewriter.typeWithCursor('A', 'cyan');
    await typewriter.typeWithCursor('');
    await typewriter.typeWithHackerEffect('B', 'green');
    await typewriter.typeWithHackerEffect('');
    await typewriter.typeWithGlitch('C', 'green');
    await typewriter.typeWithGlitch('');

    const glitchyTypewriter = new TypewriterEffect(0, theme, {
      output,
      sleep: async () => {},
      random: () => 0.05
    });
    await glitchyTypewriter.typeWithGlitch('D', 'green');

    expect(writes.join('')).toContain('Hi');
    expect(logs).toHaveLength(1);
    expect(typewriter.calculateTypingDelay(' ')).toBeGreaterThanOrEqual(5);
    expect(typewriter.calculateTypingDelay('.')).toBeGreaterThanOrEqual(20);
    expect(typewriter.calculateTypingDelay('A')).toBeGreaterThanOrEqual(12);
    expect(typewriter.calculateTypingDelay('7')).toBeGreaterThanOrEqual(8);
    expect(new TypewriterEffect(undefined, theme, createInstantRuntime(output)).speed).toBe(50);
    expect(new TypewriterEffect('not-a-number', theme, createInstantRuntime(output)).speed).toBe(50);
  });

  test('ascii banner writes glitch and subtitle output', async () => {
    const { output, writes, logs } = createMockOutput();
    const banner = new AsciiBanner(theme, createInstantRuntime(output));
    const defaultBanner = new AsciiBanner(theme);

    await banner.display();
    await banner.glitchEffect('', theme.banner);
    await banner.typewriterSubtitle('Single');
    await defaultBanner.sleep(0);

    expect(writes.join('')).toContain('Transform');
    expect(logs.join('\n')).toContain('██████');
  });

  test('progress bars clamp values and render every style', async () => {
    const { output, writes, logs } = createMockOutput();
    const progress = new ProgressBars(theme, createInstantRuntime(output));
    const defaultProgress = new ProgressBars(theme);

    expect(progress.getProgressParts(-1).filledLength).toBe(0);
    expect(progress.getProgressParts(150).filledLength).toBe(20);
    expect(defaultProgress.getProgressParts(25).filledLength).toBe(5);

    await progress.showProgress('Feature', 75);
    await progress.animateProgress('Zero', '', '', 0);
    await progress.showFeatureProgress([{ name: 'Known', percentage: 80 }, { name: 'Random' }]);
    await progress.showLoadingSpinner('Loading', 0);
    await new ProgressBars(theme, {
      output,
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      random: () => 0.5
    }).showLoadingSpinner('Ticking', 120);
    await progress.showMatrixProgress('Matrix', 50);
    await progress.showGlitchProgress('Glitch', 50);
    await progress.showNeonProgress('Neon', 50);

    const glitchyProgress = new ProgressBars(theme, {
      output,
      sleep: async () => {},
      random: () => 0.01
    });
    await glitchyProgress.showGlitchProgress('Glitchy', 5);

    expect(writes.join('')).toContain('%');
    expect(logs.join('\n')).toContain('Feature');
  });

  test('section transitions render all effects', async () => {
    const { output, writes, logs } = createMockOutput();
    const transitions = new SectionTransitions(theme, createInstantRuntime(output));

    await transitions.transition();
    await transitions.sceneTransition();
    await transitions.matrixEffect();
    await transitions.scanLines();
    await transitions.fadeEffect();
    await transitions.glitchTransition();
    await transitions.dramaticPause();

    const glitchyTransitions = new SectionTransitions(theme, {
      output,
      sleep: async () => {},
      random: () => 0.1
    });
    await glitchyTransitions.glitchTransition();

    expect(writes.join('')).toContain('SCENE TRANSITION');
    expect(writes.join('')).toContain('Loading next scene');
    expect(logs.length).toBeGreaterThan(0);
  });

  test('syntax highlighter covers languages and fallbacks', () => {
    const highlighter = new SyntaxHighlighter(theme);

    expect(highlighter.highlight('const x = 1;', 'javascript')).toContain('const');
    expect(highlighter.highlight('def hello(): pass', 'python')).toContain('def');
    expect(highlighter.highlight('<h1>Hello</h1>', 'html')).toContain('h1');
    expect(highlighter.highlight('body { color: #fff; }', 'css')).toContain('color');
    expect(highlighter.highlight('{"ok": true}', 'json')).toContain('ok');
    expect(highlighter.highlight('ok: true', 'yaml')).toContain('ok');
    expect(highlighter.highlight('if true; then echo hi; fi', 'bash')).toContain('then');
    expect(highlighter.highlight('plain text')).toContain('plain text');
    expect(highlighter.highlight('', 'javascript')).toBe('');
    expect(highlighter.highlightInline('inline')).toContain('inline');
    expect(highlighter.highlightInline('inline', 'unknown')).toContain('inline');
    expect(highlighter.getSyntaxPatterns('unknown')).toEqual([]);
    expect(highlighter.getLanguageColor('JAVASCRIPT')).toBe('yellow');
    expect(highlighter.getLanguageColor('unknown')).toBe(theme.code);
  });

  test('runtime utilities handle invalid values safely', () => {
    expect(colorize('not-a-color', 'text')).toBe('text');
    expect(normalizeSpeed('25')).toBe(25);
    expect(normalizeSpeed('-1')).toBe(50);
    expect(clampPercentage('nope')).toBe(0);
    expect(clampPercentage(-5)).toBe(0);
    expect(clampPercentage(105)).toBe(100);
  });

  test('runtime creates default output and non-instant sleep', async () => {
    const originalWrite = process.stdout.write;
    const originalLog = console.log;
    const originalError = console.error;
    const originalClear = console.clear;

    process.stdout.write = jest.fn();
    console.log = jest.fn();
    console.error = jest.fn();
    console.clear = jest.fn();

    try {
      const output = createConsoleOutput();
      output.write('x');
      output.log('y');
      output.error('z');
      output.clear();

      const runtime = createRuntime({ instant: false, random: () => 0.25 });
      expect(runtime.random()).toBe(0.25);
      await runtime.sleep(0);

      expect(process.stdout.write).toHaveBeenCalledWith('x');
      expect(console.log).toHaveBeenCalledWith('y');
      expect(console.error).toHaveBeenCalledWith('z');
      expect(console.clear).toHaveBeenCalled();
    } finally {
      process.stdout.write = originalWrite;
      console.log = originalLog;
      console.error = originalError;
      console.clear = originalClear;
    }
  });
});
