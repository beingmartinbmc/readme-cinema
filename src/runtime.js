import chalk from 'chalk';

export function createConsoleOutput() {
  return {
    write: (text) => process.stdout.write(text),
    log: (...args) => console.log(...args),
    error: (...args) => console.error(...args),
    clear: () => console.clear()
  };
}

export function createRuntime(options = {}) {
  const instant = options.instant ?? process.env.NODE_ENV === 'test';

  return {
    output: options.output ?? createConsoleOutput(),
    random: options.random ?? Math.random,
    sleep: options.sleep ?? (instant ? async () => {} : (ms) => new Promise((resolve) => setTimeout(resolve, ms)))
  };
}

export function colorize(color, text) {
  const painter = chalk[color];
  return typeof painter === 'function' ? painter(String(text)) : String(text);
}

export function normalizeSpeed(speed, fallback = 50) {
  const parsed = Number.parseInt(speed, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

export function clampPercentage(percentage) {
  const parsed = Number.parseFloat(percentage);
  if (!Number.isFinite(parsed)) {
    return 0;
  }
  return Math.max(0, Math.min(100, parsed));
}
