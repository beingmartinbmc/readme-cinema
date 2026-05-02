import { execFileSync, spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export function stripAnsi(text) {
  return text.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '').replace(/\x1B\][^\x07]*\x07/g, '');
}

export function buildCastHeader(width = 80, height = 24) {
  return JSON.stringify({
    version: 2,
    width,
    height,
    timestamp: Math.floor(Date.now() / 1000),
    env: { SHELL: '/bin/bash', TERM: 'xterm-256color' }
  });
}

export function buildCastEvents(chunks, frameDuration = 0.04) {
  const events = [];
  let elapsed = 0;

  for (const chunk of chunks) {
    events.push(JSON.stringify([elapsed, 'o', chunk]));
    elapsed += frameDuration;
  }

  return events;
}

export async function recordToCast(filePath, options = {}) {
  const {
    readmePath,
    castPath,
    width = 80,
    height = 24,
    frameDuration = 0.04
  } = options;

  const { readmeCinema } = await import('./index.js');

  const chunks = [];
  const output = {
    write: (text) => chunks.push(String(text)),
    log: (...args) => chunks.push(args.join(' ') + '\n'),
    error: (...args) => chunks.push(args.join(' ') + '\n'),
    clear: () => chunks.push('\x1B[2J\x1B[H')
  };

  const target = readmePath || filePath;

  await readmeCinema(target, {
    ...options,
    output,
    instant: true,
    clearScreen: true
  });

  const header = buildCastHeader(width, height);
  const events = buildCastEvents(chunks, frameDuration);
  const castContent = [header, ...events].join('\n') + '\n';

  const outputPath = castPath || target.replace(/\.[^.]+$/, '.cast');
  await fs.writeFile(outputPath, castContent, 'utf-8');

  return { outputPath, eventCount: events.length, chunks: chunks.length };
}

export function isToolAvailable(toolName) {
  try {
    execFileSync('which', [toolName], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export async function castToGif(castPath, gifPath, options = {}) {
  const { width = 80, height = 24 } = options;

  const aggArgs = [castPath, gifPath, '--cols', String(width), '--rows', String(height)];

  return new Promise((resolve, reject) => {
    const child = spawn('agg', aggArgs, { stdio: 'pipe' });
    let stderr = '';

    child.stderr.on('data', (data) => { stderr += data.toString(); });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ gifPath });
      } else {
        reject(new Error(`agg exited with code ${code}: ${stderr.trim()}`));
      }
    });

    child.on('error', (err) => {
      if (err.code === 'ENOENT') {
        reject(new Error(
          'agg is not installed. Install it from https://github.com/asciinema/agg\n' +
          'Alternatively, install asciinema + agg:\n' +
          '  brew install asciinema && cargo install --git https://github.com/asciinema/agg'
        ));
      } else {
        reject(err);
      }
    });
  });
}

export async function castToSvg(castPath, svgPath, _options = {}) {
  const svgTermArgs = ['--in', castPath, '--out', svgPath];

  return new Promise((resolve, reject) => {
    const child = spawn('svg-term', svgTermArgs, { stdio: 'pipe' });
    let stderr = '';

    child.stderr.on('data', (data) => { stderr += data.toString(); });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ svgPath });
      } else {
        reject(new Error(`svg-term exited with code ${code}: ${stderr.trim()}`));
      }
    });

    child.on('error', (err) => {
      if (err.code === 'ENOENT') {
        reject(new Error(
          'svg-term-cli is not installed. Install with:\n  npm install -g svg-term-cli'
        ));
      } else {
        reject(err);
      }
    });
  });
}

export async function generateDemo(filePath, outputPath, options = {}) {
  const {
    format = 'cast',
    width = 80,
    height = 24,
    frameDuration = 0.04,
    keepCast = false,
    ...renderOptions
  } = options;

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'readme-cinema-'));

  try {
    const castFile = format === 'cast'
      ? outputPath
      : path.join(tempDir, 'recording.cast');

    const castResult = await recordToCast(filePath, {
      ...renderOptions,
      readmePath: filePath,
      castPath: castFile,
      width,
      height,
      frameDuration
    });

    if (format === 'cast') {
      return { outputPath: castResult.outputPath, format: 'cast', eventCount: castResult.eventCount };
    }

    if (format === 'gif') {
      const result = await castToGif(castFile, outputPath, { width, height });
      if (!keepCast) await fs.remove(castFile);
      return { outputPath: result.gifPath, format: 'gif', eventCount: castResult.eventCount };
    }

    if (format === 'svg') {
      const result = await castToSvg(castFile, outputPath, { width, height });
      if (!keepCast) await fs.remove(castFile);
      return { outputPath: result.svgPath, format: 'svg', eventCount: castResult.eventCount };
    }

    throw new Error(`Unsupported format: ${format}. Use cast, gif, or svg.`);
  } finally {
    if (format !== 'cast') {
      await fs.remove(tempDir).catch(() => {});
    }
  }
}
