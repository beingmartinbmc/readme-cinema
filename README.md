# README Cinema 🎬

Transform your README files into cinematic terminal experiences with ASCII art, typewriter effects, and dramatic transitions.

## Features

### 🎨 ASCII Banner & Logo
- Generate cinematic ASCII titles using figlet
- Instant wow factor with dramatic glitch effects
- Customizable fonts and layouts

### ⌨️ Typewriter / Hacker Text Effect
- Slowly "types" the README content like a terminal hack scene
- Adds drama and makes people want to record and share
- Realistic typing delays and occasional "thinking" pauses

### 🎭 Section Transitions
- Each section of the README appears like movie "scenes"
- Multiple transition effects: matrix, glitch, fade, scan lines
- Dramatic pauses between major sections

### 🌈 Syntax Highlighting for Code Blocks
- Parse markdown code snippets and display with colors
- Support for multiple programming languages
- Customizable color schemes

### 📊 Progress Bars & Spinners
- Animated progress bars for features and capabilities
- Example: `Roast Intensity: █████░░░░░░░ 50%`
- Multiple progress bar styles: matrix, glitch, neon

### 📁 Custom File Input
```bash
npx readme-cinema ./docs/intro.md
```

## Installation

```bash
npm install -g readme-cinema
```

## Usage

### Basic Usage
```bash
readme-cinema
```

### With Custom File
```bash
readme-cinema ./path/to/your/readme.md
```

### With Options
```bash
readme-cinema --speed 30 --color neon --progress
```

## Options

- `--speed <ms>` - Typewriter speed in milliseconds (default: 50)
- `--color <theme>` - Color theme: hacker, neon, classic, matrix, cyberpunk, retro, dark, rainbow (default: hacker)
- `--progress` - Show progress bars for features
- `--transitions` - Enable dramatic section transitions (default: true)

## Color Themes

### Hacker (Default)
- Green and cyan color scheme
- Perfect for cybersecurity and tech projects

### Neon
- Magenta and cyan colors
- Cyberpunk aesthetic

### Classic
- Blue and white theme
- Professional and clean

### Matrix
- All green theme
- Matrix-style experience

### Cyberpunk
- Magenta and cyan
- Futuristic vibe

### Retro
- Yellow and cyan
- Vintage terminal feel

### Dark
- White and gray
- Minimalist approach

### Rainbow
- Multiple colors
- Fun and vibrant

## Examples

### Basic README Display
```bash
readme-cinema README.md
```

### Fast Typing with Neon Theme
```bash
readme-cinema --speed 20 --color neon
```

### With Progress Bars
```bash
readme-cinema --progress --color cyberpunk
```

## Code Example

```javascript
import { readmeCinema } from 'readme-cinema';

await readmeCinema('./README.md', {
  speed: 50,
  color: 'hacker',
  progress: true,
  transitions: true
});
```

## Features in Action

When you run readme-cinema, you'll see:

1. **Dramatic ASCII Banner** - Your project name in large ASCII art
2. **Typewriter Effect** - Text appears character by character
3. **Section Transitions** - Movie-like scene changes between sections
4. **Syntax Highlighting** - Code blocks with language-specific colors
5. **Progress Bars** - Animated progress for features (when enabled)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [chalk](https://github.com/chalk/chalk) for colors
- ASCII art powered by [figlet](https://github.com/patorjk/figlet.js)
- Markdown parsing with [marked](https://github.com/markedjs/marked)

---

Made with ❤️ for the terminal community
# readme-cinema
