# README Cinema 🎬

Transform your README files into cinematic terminal experiences with ASCII art, typewriter effects, and dramatic transitions.

## What is README Cinema?

README Cinema is a CLI tool that makes your documentation come alive! Instead of boring static text, it displays your README files with:

- 🎬 **Cinematic effects** like movie scenes
- ⌨️ **Typewriter animation** that types text character by character  
- 🎨 **Colorful themes** from hacker green to neon pink
- 📊 **Animated progress bars** for features
- 🌈 **Syntax highlighting** for code blocks

Perfect for:
- **Presentations** - Wow your audience with dramatic reveals
- **Social media** - Create shareable terminal content
- **Documentation** - Make your READMEs memorable
- **Streaming** - Add visual flair to your coding streams

## 🚀 Quick Start

```bash
# Install globally
npm install -g readme-cinema

# Run on your README
readme-cinema

# Or with a custom file
readme-cinema ./path/to/your/readme.md
```

That's it! Your README will now display with cinematic effects. 🎬

## ✨ Features

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

## 🎬 What You'll See

When you run `readme-cinema`, here's the cinematic experience:

1. **🎨 Dramatic ASCII Banner** - Your project name appears in large ASCII art with glitch effects
2. **⌨️ Typewriter Effect** - Text types out character by character like a hacker scene
3. **🎭 Scene Transitions** - "SCENE TRANSITION" appears between major sections
4. **🌈 Syntax Highlighting** - Code blocks glow with language-specific colors
5. **📊 Progress Bars** - Features show animated progress: `██████████░░ 80%`

### Example Output:
```
██████╗ ███████╗ █████╗ ██████╗ ███╗   ███╗███████╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝
██████╔╝█████╗  ███████║██║  ██║██╔████╔██║█████╗
██╔══██╗██╔══╝  ██╔══██║██║  ██║██║╚██╔╝██║██╔══╝
██║  ██║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚══════╝

Transform your docs into cinematic experiences

# My Awesome Project

Welcome to my project! This text will type out character by character...

                                              SCENE TRANSITION

## Features

• Lightning Fast ██████████░░ 90%
• Cross Platform █████████░░░ 80%
• Easy Integration ████████░░░░ 70%
```

## 📦 Installation

```bash
npm install -g readme-cinema
```

## 🎮 Usage

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

## ⚙️ Options

- `--speed <ms>` - Typewriter speed in milliseconds (default: 50)
- `--color <theme>` - Color theme: hacker, neon, classic, matrix, cyberpunk, retro, dark, rainbow (default: hacker)
- `--progress` - Show progress bars for features
- `--transitions` - Enable dramatic section transitions (default: true)

## 🎨 Color Themes

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

## 💡 Examples

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

## 🔧 Code Example

```javascript
import { readmeCinema } from 'readme-cinema';

await readmeCinema('./README.md', {
  speed: 50,
  color: 'hacker',
  progress: true,
  transitions: true
});
```

## Contributing

We welcome contributions from the community! Here's how you can help improve README Cinema:

### 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/readme-cinema.git
   cd readme-cinema
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create your feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

### 🛠️ Development

- **Run the CLI locally**: `node bin/cli.js README.md`
- **Test different themes**: `node bin/cli.js --color neon --progress`
- **Run the demo**: `node demo.js`

### 📝 Making Changes

1. **Make your changes** - Add new features, fix bugs, or improve documentation
2. **Test your changes** - Ensure everything works as expected
3. **Commit your changes**
   ```bash
   git commit -m 'feat: add new transition effect'
   git commit -m 'fix: resolve syntax highlighting issue'
   git commit -m 'docs: update installation instructions'
   ```
4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** with a clear description of your changes

### 🎯 Areas for Contribution

- **New Color Themes** - Add more visual themes
- **Transition Effects** - Create new cinematic transitions
- **Progress Bar Styles** - Design new progress animations
- **Syntax Highlighting** - Support for more programming languages
- **Performance Improvements** - Optimize typing speed and effects
- **Documentation** - Improve README, add examples, or create tutorials
- **Bug Fixes** - Report and fix issues

### 📋 Pull Request Guidelines

- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Test coverage** for new features
- **Documentation updates** if needed
- **Follow existing code style** and conventions

### 🐛 Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/beingmartinbmc/readme-cinema/issues) with:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (OS, Node.js version, etc.)

### 📄 Code of Conduct

This project is open to everyone. Please be respectful and inclusive in all interactions.

## Author

**Ankit Sharma** - [ankit.sharma199803@gmail.com](mailto:ankit.sharma199803@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [chalk](https://github.com/chalk/chalk) for colors
- ASCII art powered by [figlet](https://github.com/patorjk/figlet.js)
- Markdown parsing with [marked](https://github.com/markedjs/marked)

---

Made with ❤️ for the terminal community
