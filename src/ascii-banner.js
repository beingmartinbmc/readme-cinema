import figlet from 'figlet';
import chalk from 'chalk';

export class AsciiBanner {
  constructor(theme) {
    this.theme = theme;
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
        console.log(chalk[this.theme.banner](line));
        await this.sleep(100);
      } else {
        console.log('');
      }
    }
    
    // Add subtitle with typewriter effect
    console.log('\n');
    await this.typewriterSubtitle(subtitle);
    console.log('\n');
    
    // Add dramatic pause
    await this.sleep(1000);
  }

  async glitchEffect(text, color) {
    // Simulate glitch effect
    const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '▌', '▐'];
    const originalText = text;
    
    for (let i = 0; i < 3; i++) {
      const glitched = originalText.split('').map(char => 
        char === ' ' ? ' ' : glitchChars[Math.floor(Math.random() * glitchChars.length)]
      ).join('');
      
      process.stdout.write(`\r${chalk[color](glitched)}`);
      await this.sleep(50);
    }
    
    process.stdout.write(`\r${chalk[color](originalText)}`);
  }

  async typewriterSubtitle(text) {
    const words = text.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      process.stdout.write(chalk[this.theme.subtitle](words[i]));
      if (i < words.length - 1) {
        process.stdout.write(' ');
      }
      await this.sleep(150);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
