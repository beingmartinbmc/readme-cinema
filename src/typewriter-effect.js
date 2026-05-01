import { colorize, createRuntime, normalizeSpeed } from './runtime.js';

export class TypewriterEffect {
  constructor(speed = 50, theme, runtimeOptions = {}) {
    this.speed = normalizeSpeed(speed);
    this.theme = theme;
    this.currentLine = '';
    this.runtime = createRuntime(runtimeOptions);
  }

  async type(text, color = 'white') {
    const chars = String(text).split('');
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Add character to current line
      this.currentLine += char;
      
      // Handle special characters
      if (char === '\n') {
        this.runtime.output.log();
        this.currentLine = '';
        continue;
      }
      
      // Display the character with color
      this.runtime.output.write(colorize(color, char));
      
      // Add realistic typing delays
      await this.getTypingDelay(char);
      
      // Occasionally add "thinking" pauses
      if (this.runtime.random() < 0.02) {
        await this.sleep(this.speed * 3);
      }
    }
  }

  calculateTypingDelay(char) {
    let delay = this.speed;
    
    // Vary typing speed based on character type
    if (char === ' ') {
      delay = this.speed * 0.5; // Faster for spaces
    } else if (char === '.' || char === '!' || char === '?') {
      delay = this.speed * 2; // Slower for punctuation
    } else if (char === ',' || char === ';' || char === ':') {
      delay = this.speed * 1.5; // Medium for other punctuation
    } else if (/[A-Z]/.test(char)) {
      delay = this.speed * 1.2; // Slightly slower for capitals
    } else if (/[0-9]/.test(char)) {
      delay = this.speed * 0.8; // Faster for numbers
    }
    
    // Add some randomness for more natural typing
    delay += this.runtime.random() * this.speed * 0.3;
    
    return delay;
  }

  async getTypingDelay(char) {
    const delay = this.calculateTypingDelay(char);
    await this.sleep(delay);
    return delay;
  }

  async typeWithCursor(text, color = 'white') {
    const chars = String(text).split('');
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Show cursor effect
      this.runtime.output.write(colorize(color, char) + colorize('cyan', '|'));
      await this.sleep(this.speed);
      
      // Remove cursor
      this.runtime.output.write('\b');
      
      // Add character to current line
      this.currentLine += char;
    }
  }

  async typeWithHackerEffect(text, color = 'white') {
    const chars = String(text).split('');
    const hackerChars = ['0', '1', '█', '▓', '▒', '░', '▄', '▀'];
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Show random characters first (hacker effect)
      for (let j = 0; j < 3; j++) {
        const randomChar = hackerChars[Math.floor(this.runtime.random() * hackerChars.length)];
        this.runtime.output.write(colorize(color, randomChar));
        await this.sleep(30);
        this.runtime.output.write('\b');
      }
      
      // Show the actual character
      this.runtime.output.write(colorize(color, char));
      this.currentLine += char;
      
      await this.sleep(this.speed);
    }
  }

  async typeWithGlitch(text, color = 'white') {
    const chars = String(text).split('');
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Occasionally glitch the character
      if (this.runtime.random() < 0.1) {
        const glitchChar = String.fromCharCode(0x2588 + Math.floor(this.runtime.random() * 8));
        this.runtime.output.write(colorize(color, glitchChar));
        await this.sleep(50);
        this.runtime.output.write('\b');
      }
      
      // Show the actual character
      this.runtime.output.write(colorize(color, char));
      this.currentLine += char;
      
      await this.sleep(this.speed);
    }
  }

  sleep(ms) {
    return this.runtime.sleep(ms);
  }
}
