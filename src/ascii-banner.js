import figlet from 'figlet';
import { colorize, createRuntime } from './runtime.js';

export class AsciiBanner {
  constructor(theme, runtimeOptions = {}) {
    this.theme = theme;
    this.runtime = createRuntime(runtimeOptions);
  }

  async display() {
    const title = 'README CINEMA';
    const subtitle = 'Transform your docs into cinematic experiences';
    
    // Generate ASCII art
    const asciiTitle = figlet.textSync(title, {
      font: 'ANSI Shadow',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    });

    // Split into lines for dramatic effect
    const lines = asciiTitle.split('\n');
    
    // Display with dramatic timing
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim()) {
        // Add glitch effect for dramatic impact
        await this.glitchEffect(line, this.theme.banner);
        this.runtime.output.log(colorize(this.theme.banner, line));
        await this.sleep(100);
      } else {
        this.runtime.output.log('');
      }
    }
    
    // Add subtitle with typewriter effect
    this.runtime.output.log('\n');
    await this.typewriterSubtitle(subtitle);
    this.runtime.output.log('\n');
    
    // Add dramatic pause
    await this.sleep(1000);
  }

  async glitchEffect(text, color) {
    // Simulate glitch effect
    const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '▌', '▐'];
    const originalText = text;
    
    for (let i = 0; i < 3; i++) {
      const glitched = originalText.split('').map(char => 
        char === ' ' ? ' ' : glitchChars[Math.floor(this.runtime.random() * glitchChars.length)]
      ).join('');
      
      this.runtime.output.write(`\r${colorize(color, glitched)}`);
      await this.sleep(50);
    }
    
    this.runtime.output.write(`\r${colorize(color, originalText)}`);
  }

  async typewriterSubtitle(text) {
    const words = text.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      this.runtime.output.write(colorize(this.theme.subtitle, words[i]));
      if (i < words.length - 1) {
        this.runtime.output.write(' ');
      }
      await this.sleep(150);
    }
  }

  sleep(ms) {
    return this.runtime.sleep(ms);
  }
}
