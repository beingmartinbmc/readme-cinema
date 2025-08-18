# README Cinema 🎬

Transform your README files into cinematic terminal experiences with ASCII art, typewriter effects, and dramatic transitions.

## 🚀 Quick Start

```bash
# Install globally
npm install -g readme-cinema

# Run on your README
readme-cinema

# Or with options
readme-cinema --color neon --progress --speed 30
```

## ✨ Features

- **🎨 ASCII Banner** - Dramatic ASCII art titles with glitch effects
- **⌨️ Typewriter Effect** - Text types out character by character
- **🎭 Scene Transitions** - Movie-like transitions between sections
- **🌈 Syntax Highlighting** - Color-coded code blocks
- **📊 Progress Bars** - Animated progress for features
- **🎨 8 Color Themes** - Hacker, Neon, Classic, Matrix, Cyberpunk, Retro, Dark, Rainbow

## 🎮 Usage

### Basic Usage
```bash
readme-cinema                    # Uses default README.md
readme-cinema ./path/to/file.md  # Custom file
```

### With Options
```bash
readme-cinema --color neon --progress --speed 20
readme-cinema --color matrix --transitions
readme-cinema --color rainbow --progress
```

## ⚙️ Options

| Option | Description | Default |
|--------|-------------|---------|
| `--speed <ms>` | Typewriter speed in milliseconds | `50` |
| `--color <theme>` | Color theme | `hacker` |
| `--progress` | Show progress bars for features | `false` |
| `--transitions` | Enable section transitions | `true` |

## 🎨 Color Themes

| Theme | Colors | Style |
|-------|--------|-------|
| **Hacker** | Green/Cyan | Cybersecurity vibes |
| **Neon** | Magenta/Cyan | Cyberpunk aesthetic |
| **Classic** | Blue/White | Professional |
| **Matrix** | All Green | Matrix-style |
| **Cyberpunk** | Magenta/Cyan | Futuristic |
| **Retro** | Yellow/Cyan | Vintage terminal |
| **Dark** | White/Gray | Minimalist |
| **Rainbow** | Multiple | Fun & vibrant |

## 🎬 Example Output

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

## 💡 Examples

### Fast Typing with Neon Theme
```bash
readme-cinema --speed 20 --color neon --progress
```

### Matrix Hacker Style
```bash
readme-cinema --color matrix --transitions
```

### Rainbow Explosion
```bash
readme-cinema --color rainbow --progress
```

## 🔧 Programmatic Usage

```javascript
import { readmeCinema } from 'readme-cinema';

await readmeCinema('./README.md', {
  speed: 50,
  color: 'hacker',
  progress: true,
  transitions: true
});
```

## 📱 Share Your Creation

Record your cinematic README and share it:
- **Twitter**: `#readmecinema` `#terminalart`
- **LinkedIn**: Show off your documentation skills
- **GitHub**: Add a demo GIF to your project README

### Creating Demo GIFs
```bash
# Record terminal session
asciinema rec demo.cast

# Convert to GIF
asciinema-gif demo.cast demo.gif

# Add to README
![Demo](demo.gif)
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Ankit Sharma** - [ankit.sharma199803@gmail.com](mailto:ankit.sharma199803@gmail.com)

---

Made with ❤️ for the terminal community
