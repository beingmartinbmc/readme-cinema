import chalk from 'chalk';

export class TypewriterEffect {
  constructor(speed = 50, theme) {
    this.speed = parseInt(speed);
    this.theme = theme;
    this.currentLine = '';
  }

  async type(text, color = 'white') {
    const chars = text.split('');
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Add character to current line
      this.currentLine += char;
      
      // Handle special characters
      if (char === '\n') {
        console.log();
        this.currentLine = '';
        continue;
      }
      
      // Display the character with color
      process.stdout.write(chalk[color](char));
      
      // Add realistic typing delays
      await this.getTypingDelay(char);
      
      // Occasionally add "thinking" pauses
      if (Math.random() < 0.02) {
        await this.sleep(this.speed * 3);
      }
    }
  }

  async getTypingDelay(char) {
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
    delay += Math.random() * this.speed * 0.3;
    
    await this.sleep(delay);
  }

  async typeWithCursor(text, color = 'white') {
    const chars = text.split('');
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Show cursor effect
      process.stdout.write(chalk[color](char) + chalk.cyan('|'));
      await this.sleep(this.speed);
      
      // Remove cursor
      process.stdout.write('\b');
      
      // Add character to current line
      this.currentLine += char;
    }
  }

  async typeWithHackerEffect(text, color = 'white') {
    const chars = text.split('');
    const hackerChars = ['0', '1', '█', '▓', '▒', '░', '▄', '▀'];
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Show random characters first (hacker effect)
      for (let j = 0; j < 3; j++) {
        const randomChar = hackerChars[Math.floor(Math.random() * hackerChars.length)];
        process.stdout.write(chalk[color](randomChar));
        await this.sleep(30);
        process.stdout.write('\b');
      }
      
      // Show the actual character
      process.stdout.write(chalk[color](char));
      this.currentLine += char;
      
      await this.sleep(this.speed);
    }
  }

  async typeWithGlitch(text, color = 'white') {
    const chars = text.split('');
    
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      
      // Occasionally glitch the character
      if (Math.random() < 0.1) {
        const glitchChar = String.fromCharCode(0x2588 + Math.floor(Math.random() * 8));
        process.stdout.write(chalk[color](glitchChar));
        await this.sleep(50);
        process.stdout.write('\b');
      }
      
      // Show the actual character
      process.stdout.write(chalk[color](char));
      this.currentLine += char;
      
      await this.sleep(this.speed);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
