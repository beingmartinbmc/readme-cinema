import { clampPercentage, colorize, createRuntime } from './runtime.js';

export class ProgressBars {
  constructor(theme, runtimeOptions = {}) {
    this.theme = theme;
    this.barLength = 20;
    this.runtime = createRuntime(runtimeOptions);
  }

  async showProgress(label, percentage) {
    // Clamp percentage to 0-100 range
    const clampedPercentage = clampPercentage(percentage);
    const { filledBar, emptyBar } = this.getProgressParts(clampedPercentage);
    
    // Animate the progress bar
    await this.animateProgress(label, filledBar, emptyBar, clampedPercentage);
  }

  getProgressParts(percentage) {
    const clampedPercentage = clampPercentage(percentage);
    const filledLength = Math.floor((clampedPercentage / 100) * this.barLength);
    const emptyLength = Math.max(0, this.barLength - filledLength);

    return {
      filledLength,
      emptyLength,
      filledBar: '█'.repeat(filledLength),
      emptyBar: '░'.repeat(emptyLength)
    };
  }

  async animateProgress(label, _filledBar, _emptyBar, percentage) {
    const frames = 10;
    const targetPercentage = clampPercentage(percentage);
    
    for (let i = 0; i <= frames; i++) {
      const progress = (i / frames) * targetPercentage;
      const currentFilled = Math.floor((progress / 100) * this.barLength);
      const currentEmpty = this.barLength - currentFilled;
      
      const currentFilledBar = '█'.repeat(currentFilled);
      const currentEmptyBar = '░'.repeat(currentEmpty);
      
      // Clear the line and show progress
      this.runtime.output.write(`\r${colorize(this.theme.progress, currentFilledBar)}${colorize('gray', currentEmptyBar)} ${colorize(this.theme.progress, `${Math.floor(progress)}%`)}`);
      
      await this.sleep(50);
    }
    
    // Show final result
    this.runtime.output.log(` ${colorize(this.theme.accent, label)}`);
  }

  async showFeatureProgress(features) {
    this.runtime.output.log('\n');
    
    for (const feature of features) {
      const percentage = feature.percentage ?? Math.floor(this.runtime.random() * 40) + 60;
      await this.showProgress(feature.name, percentage);
      await this.sleep(200);
    }
    
    this.runtime.output.log('\n');
  }

  async showLoadingSpinner(text, duration = 2000) {
    const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;

    this.runtime.output.write(`\r${colorize(this.theme.accent, spinner[i])} ${text}`);
    
    const interval = setInterval(() => {
      i = (i + 1) % spinner.length;
      this.runtime.output.write(`\r${colorize(this.theme.accent, spinner[i])} ${text}`);
    }, 100);
    
    await this.sleep(duration);
    clearInterval(interval);
    
    // Clear the spinner
    this.runtime.output.write('\r' + ' '.repeat(text.length + 2) + '\r');
  }

  async showMatrixProgress(label, percentage) {
    const matrixChars = ['0', '1', '█', '▓', '▒', '░'];
    const targetPercentage = clampPercentage(percentage);
    const filledLength = this.getProgressParts(targetPercentage).filledLength;
    
    for (let i = 0; i <= filledLength; i++) {
      let bar = '';
      
      for (let j = 0; j < this.barLength; j++) {
        if (j < i) {
          bar += colorize(this.theme.progress, '█');
        } else if (j === i) {
          // Animate the current position with matrix characters
          const matrixChar = matrixChars[Math.floor(this.runtime.random() * matrixChars.length)];
          bar += colorize(this.theme.accent, matrixChar);
        } else {
          bar += colorize('gray', '░');
        }
      }
      
      this.runtime.output.write(`\r${bar} ${colorize(this.theme.progress, `${Math.floor((i / this.barLength) * 100)}%`)}`);
      await this.sleep(100);
    }
    
    this.runtime.output.log(` ${colorize(this.theme.accent, label)}`);
  }

  async showGlitchProgress(label, percentage) {
    const filledLength = this.getProgressParts(percentage).filledLength;
    
    // Show glitch effect during progress
    for (let i = 0; i <= filledLength; i++) {
      let bar = '';
      
      for (let j = 0; j < this.barLength; j++) {
        if (j < i) {
          // Occasionally glitch filled parts
          if (this.runtime.random() < 0.1) {
            bar += colorize(this.theme.accent, '█');
          } else {
            bar += colorize(this.theme.progress, '█');
          }
        } else if (j === i) {
          bar += colorize(this.theme.accent, '█');
        } else {
          bar += colorize('gray', '░');
        }
      }
      
      this.runtime.output.write(`\r${bar} ${colorize(this.theme.progress, `${Math.floor((i / this.barLength) * 100)}%`)}`);
      await this.sleep(80);
    }
    
    this.runtime.output.log(` ${colorize(this.theme.accent, label)}`);
  }

  async showNeonProgress(label, percentage) {
    const targetPercentage = clampPercentage(percentage);
    const { filledBar, emptyBar } = this.getProgressParts(targetPercentage);
    
    // Neon glow effect
    for (let i = 0; i < 3; i++) {
      this.runtime.output.write(`\r${colorize(this.theme.progress, filledBar)}${colorize('gray', emptyBar)} ${colorize(this.theme.progress, `${targetPercentage}%`)}`);
      await this.sleep(200);
      this.runtime.output.write(`\r${colorize(this.theme.accent, filledBar)}${colorize('gray', emptyBar)} ${colorize(this.theme.accent, `${targetPercentage}%`)}`);
      await this.sleep(200);
    }
    
    this.runtime.output.log(` ${colorize(this.theme.accent, label)}`);
  }

  sleep(ms) {
    return this.runtime.sleep(ms);
  }
}
