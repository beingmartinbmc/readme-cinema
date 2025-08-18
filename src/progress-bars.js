import chalk from 'chalk';

export class ProgressBars {
  constructor(theme) {
    this.theme = theme;
    this.barLength = 20;
  }

  async showProgress(label, percentage) {
    const filledLength = Math.floor((percentage / 100) * this.barLength);
    const emptyLength = this.barLength - filledLength;
    
    const filledBar = '█'.repeat(filledLength);
    const emptyBar = '░'.repeat(emptyLength);
    
    // Animate the progress bar
    await this.animateProgress(label, filledBar, emptyBar, percentage);
  }

  async animateProgress(label, filledBar, emptyBar, percentage) {
    const frames = 10;
    
    for (let i = 0; i <= frames; i++) {
      const progress = (i / frames) * percentage;
      const currentFilled = Math.floor((progress / 100) * this.barLength);
      const currentEmpty = this.barLength - currentFilled;
      
      const currentFilledBar = '█'.repeat(currentFilled);
      const currentEmptyBar = '░'.repeat(currentEmpty);
      
      // Clear the line and show progress
      process.stdout.write(`\r${chalk[this.theme.progress](currentFilledBar)}${chalk.gray(currentEmptyBar)} ${chalk[this.theme.progress](`${Math.floor(progress)}%`)}`);
      
      await this.sleep(50);
    }
    
    // Show final result
    console.log(` ${chalk[this.theme.accent](label)}`);
  }

  async showFeatureProgress(features) {
    console.log('\n');
    
    for (const feature of features) {
      const percentage = feature.percentage || Math.floor(Math.random() * 40) + 60;
      await this.showProgress(feature.name, percentage);
      await this.sleep(200);
    }
    
    console.log('\n');
  }

  async showLoadingSpinner(text, duration = 2000) {
    const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const startTime = Date.now();
    let i = 0;
    
    const interval = setInterval(() => {
      process.stdout.write(`\r${chalk[this.theme.accent](spinner[i])} ${text}`);
      i = (i + 1) % spinner.length;
    }, 100);
    
    await this.sleep(duration);
    clearInterval(interval);
    
    // Clear the spinner
    process.stdout.write('\r' + ' '.repeat(text.length + 2) + '\r');
  }

  async showMatrixProgress(label, percentage) {
    const matrixChars = ['0', '1', '█', '▓', '▒', '░'];
    const filledLength = Math.floor((percentage / 100) * this.barLength);
    
    for (let i = 0; i <= filledLength; i++) {
      let bar = '';
      
      for (let j = 0; j < this.barLength; j++) {
        if (j < i) {
          bar += chalk[this.theme.progress]('█');
        } else if (j === i) {
          // Animate the current position with matrix characters
          const matrixChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          bar += chalk[this.theme.accent](matrixChar);
        } else {
          bar += chalk.gray('░');
        }
      }
      
      process.stdout.write(`\r${bar} ${chalk[this.theme.progress](`${Math.floor((i / this.barLength) * 100)}%`)}`);
      await this.sleep(100);
    }
    
    console.log(` ${chalk[this.theme.accent](label)}`);
  }

  async showGlitchProgress(label, percentage) {
    const filledLength = Math.floor((percentage / 100) * this.barLength);
    const emptyLength = this.barLength - filledLength;
    
    // Show glitch effect during progress
    for (let i = 0; i <= filledLength; i++) {
      let bar = '';
      
      for (let j = 0; j < this.barLength; j++) {
        if (j < i) {
          // Occasionally glitch filled parts
          if (Math.random() < 0.1) {
            bar += chalk[this.theme.accent]('█');
          } else {
            bar += chalk[this.theme.progress]('█');
          }
        } else if (j === i) {
          bar += chalk[this.theme.accent]('█');
        } else {
          bar += chalk.gray('░');
        }
      }
      
      process.stdout.write(`\r${bar} ${chalk[this.theme.progress](`${Math.floor((i / this.barLength) * 100)}%`)}`);
      await this.sleep(80);
    }
    
    console.log(` ${chalk[this.theme.accent](label)}`);
  }

  async showNeonProgress(label, percentage) {
    const filledLength = Math.floor((percentage / 100) * this.barLength);
    const emptyLength = this.barLength - filledLength;
    
    const filledBar = '█'.repeat(filledLength);
    const emptyBar = '░'.repeat(emptyLength);
    
    // Neon glow effect
    for (let i = 0; i < 3; i++) {
      process.stdout.write(`\r${chalk[this.theme.progress](filledBar)}${chalk.gray(emptyBar)} ${chalk[this.theme.progress](`${percentage}%`)}`);
      await this.sleep(200);
      process.stdout.write(`\r${chalk[this.theme.accent](filledBar)}${chalk.gray(emptyBar)} ${chalk[this.theme.accent](`${percentage}%`)}`);
      await this.sleep(200);
    }
    
    console.log(` ${chalk[this.theme.accent](label)}`);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
