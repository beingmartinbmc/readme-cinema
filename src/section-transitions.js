import { colorize, createRuntime } from './runtime.js';

export class SectionTransitions {
  constructor(theme, runtimeOptions = {}) {
    this.theme = theme;
    this.runtime = createRuntime(runtimeOptions);
  }

  async transition() {
    this.runtime.output.log('\n');
    
    // Choose a random transition effect
    const effects = [
      this.sceneTransition.bind(this),
      this.matrixEffect.bind(this),
      this.scanLines.bind(this),
      this.fadeEffect.bind(this),
      this.glitchTransition.bind(this)
    ];
    
    const randomEffect = effects[Math.floor(this.runtime.random() * effects.length)];
    await randomEffect();
    
    this.runtime.output.log('\n');
  }

  async sceneTransition() {
    const sceneText = 'SCENE TRANSITION';
    const width = process.stdout.columns || 80;
    const padding = Math.max(0, Math.floor((width - sceneText.length) / 2));
    
    // Fade in effect
    for (let i = 0; i <= sceneText.length; i++) {
      const partial = sceneText.substring(0, i);
      const spaces = ' '.repeat(padding);
      this.runtime.output.write(`\r${spaces}${colorize(this.theme.accent, partial)}`);
      await this.sleep(100);
    }
    
    await this.sleep(500);
    
    // Fade out effect
    for (let i = sceneText.length; i >= 0; i--) {
      const partial = sceneText.substring(0, i);
      const spaces = ' '.repeat(padding);
      this.runtime.output.write(`\r${spaces}${colorize(this.theme.accent, partial)}`);
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
        const char = matrixChars[Math.floor(this.runtime.random() * matrixChars.length)];
        line += colorize(this.theme.accent, char);
      }
      this.runtime.output.log(line);
      await this.sleep(100);
    }
    
    // Clear the matrix effect
    for (let i = 0; i < height; i++) {
      this.runtime.output.write('\x1b[1A\x1b[2K'); // Move up and clear line
    }
  }

  async scanLines() {
    const width = process.stdout.columns || 80;
    const height = 3;
    
    for (let i = 0; i < height; i++) {
      const line = colorize(this.theme.accent, '█'.repeat(width));
      this.runtime.output.log(line);
      await this.sleep(150);
    }
    
    // Clear scan lines
    for (let i = 0; i < height; i++) {
      this.runtime.output.write('\x1b[1A\x1b[2K');
    }
  }

  async fadeEffect() {
    const fadeChars = ['█', '▓', '▒', '░', ' '];
    const width = process.stdout.columns || 80;
    
    for (let i = 0; i < fadeChars.length; i++) {
      const char = fadeChars[i];
      const line = colorize(this.theme.accent, char.repeat(width));
      this.runtime.output.log(line);
      await this.sleep(200);
      
      if (i < fadeChars.length - 1) {
        this.runtime.output.write('\x1b[1A\x1b[2K'); // Move up and clear
      }
    }
    
    // Clear the fade effect
    this.runtime.output.write('\x1b[1A\x1b[2K');
  }

  async glitchTransition() {
    const glitchText = 'GLITCH';
    const width = process.stdout.columns || 80;
    const padding = Math.max(0, Math.floor((width - glitchText.length) / 2));
    
    // Glitch effect
    for (let i = 0; i < 10; i++) {
      const glitched = glitchText.split('').map(char => {
        if (this.runtime.random() < 0.3) {
          return String.fromCharCode(0x2588 + Math.floor(this.runtime.random() * 8));
        }
        return char;
      }).join('');
      
      const spaces = ' '.repeat(padding);
      this.runtime.output.write(`\r${spaces}${colorize(this.theme.accent, glitched)}`);
      await this.sleep(100);
    }
    
    // Final clear
    const spaces = ' '.repeat(padding);
    this.runtime.output.write(`\r${spaces}${' '.repeat(glitchText.length)}`);
  }

  async dramaticPause() {
    const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    
    for (let i = 0; i < 20; i++) {
      const dot = dots[i % dots.length];
      this.runtime.output.write(`\r${colorize(this.theme.accent, dot)} Loading next scene...`);
      await this.sleep(100);
    }
    
    this.runtime.output.write('\r' + ' '.repeat(50) + '\r');
  }

  sleep(ms) {
    return this.runtime.sleep(ms);
  }
}
