import chalk from 'chalk';

export class SectionTransitions {
  constructor(theme) {
    this.theme = theme;
  }

  async transition() {
    console.log('\n');
    
    // Choose a random transition effect
    const effects = [
      this.sceneTransition.bind(this),
      this.matrixEffect.bind(this),
      this.scanLines.bind(this),
      this.fadeEffect.bind(this),
      this.glitchTransition.bind(this)
    ];
    
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    await randomEffect();
    
    console.log('\n');
  }

  async sceneTransition() {
    const sceneText = 'SCENE TRANSITION';
    const width = process.stdout.columns || 80;
    const padding = Math.floor((width - sceneText.length) / 2);
    
    // Fade in effect
    for (let i = 0; i <= sceneText.length; i++) {
      const partial = sceneText.substring(0, i);
      const spaces = ' '.repeat(padding);
      process.stdout.write(`\r${spaces}${chalk[this.theme.accent](partial)}`);
      await this.sleep(100);
    }
    
    await this.sleep(500);
    
    // Fade out effect
    for (let i = sceneText.length; i >= 0; i--) {
      const partial = sceneText.substring(0, i);
      const spaces = ' '.repeat(padding);
      process.stdout.write(`\r${spaces}${chalk[this.theme.accent](partial)}`);
      await this.sleep(50);
    }
  }

  async matrixEffect() {
    const width = process.stdout.columns || 80;
    const height = 5;
    const matrixChars = ['0', '1', '█', '▓', '▒', '░'];
    
    for (let row = 0; row < height; row++) {
      let line = '';
      for (let col = 0; col < width; col++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        line += chalk[this.theme.accent](char);
      }
      console.log(line);
      await this.sleep(100);
    }
    
    // Clear the matrix effect
    for (let i = 0; i < height; i++) {
      process.stdout.write('\x1b[1A\x1b[2K'); // Move up and clear line
    }
  }

  async scanLines() {
    const width = process.stdout.columns || 80;
    const height = 3;
    
    for (let i = 0; i < height; i++) {
      const line = chalk[this.theme.accent]('█'.repeat(width));
      console.log(line);
      await this.sleep(150);
    }
    
    // Clear scan lines
    for (let i = 0; i < height; i++) {
      process.stdout.write('\x1b[1A\x1b[2K');
    }
  }

  async fadeEffect() {
    const fadeChars = ['█', '▓', '▒', '░', ' '];
    const width = process.stdout.columns || 80;
    
    for (let i = 0; i < fadeChars.length; i++) {
      const char = fadeChars[i];
      const line = chalk[this.theme.accent](char.repeat(width));
      console.log(line);
      await this.sleep(200);
      
      if (i < fadeChars.length - 1) {
        process.stdout.write('\x1b[1A\x1b[2K'); // Move up and clear
      }
    }
    
    // Clear the fade effect
    process.stdout.write('\x1b[1A\x1b[2K');
  }

  async glitchTransition() {
    const glitchText = 'GLITCH';
    const width = process.stdout.columns || 80;
    const padding = Math.floor((width - glitchText.length) / 2);
    
    // Glitch effect
    for (let i = 0; i < 10; i++) {
      const glitched = glitchText.split('').map(char => {
        if (Math.random() < 0.3) {
          return String.fromCharCode(0x2588 + Math.floor(Math.random() * 8));
        }
        return char;
      }).join('');
      
      const spaces = ' '.repeat(padding);
      process.stdout.write(`\r${spaces}${chalk[this.theme.accent](glitched)}`);
      await this.sleep(100);
    }
    
    // Final clear
    const spaces = ' '.repeat(padding);
    process.stdout.write(`\r${spaces}${' '.repeat(glitchText.length)}`);
  }

  async dramaticPause() {
    const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    
    for (let i = 0; i < 20; i++) {
      const dot = dots[i % dots.length];
      process.stdout.write(`\r${chalk[this.theme.accent](dot)} Loading next scene...`);
      await this.sleep(100);
    }
    
    process.stdout.write('\r' + ' '.repeat(50) + '\r');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
