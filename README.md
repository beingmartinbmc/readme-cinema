# README Cinema

**Auto-generate cinematic README demo GIFs from markdown — zero effort.**

Every repo should have a demo GIF. README Cinema makes it one command.

## Quick Start

```bash
npm install -g readme-cinema

# Cinematic terminal playback
readme-cinema

# Export a demo GIF (requires agg)
readme-cinema --gif

# Export with a preset
readme-cinema --preset hacker-mode --gif demo.gif

# Export SVG animation (requires svg-term-cli)
readme-cinema --svg

# Export asciinema .cast recording
readme-cinema --cast
```

## Presets

Presets combine speed, theme, and effects into one flag:

| Preset | Speed | Theme | Vibe |
|---|---|---|---|
| `--preset dramatic` | 80ms | cyberpunk | Slow reveal, full effects |
| `--preset hacker-mode` | 15ms | matrix | Fast, green, raw |
| `--preset startup-pitch` | 40ms | neon | Clean, punchy |
| `--preset minimal` | 0ms | dark | No effects, instant |
| `--preset retro` | 60ms | retro | Warm, nostalgic |
| `--preset rainbow` | 35ms | rainbow | Colorful, fun |

```bash
readme-cinema --preset startup-pitch
readme-cinema --preset hacker-mode --gif
```

## GitHub Action

Add to `.github/workflows/demo.yml` for automatic demo generation on every push:

```yaml
name: Update Demo
on:
  push:
    branches: [main]
    paths: ['README.md']

jobs:
  demo:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: beingmartinbmc/readme-cinema/action@main
        with:
          preset: hacker-mode
          format: gif
          output: demo.gif
```

Then add to your README:

```markdown
![Demo](demo.gif)
```

### Action Inputs

| Input | Default | Description |
|---|---|---|
| `readme` | `README.md` | Path to README file |
| `output` | `demo.gif` | Output file path |
| `format` | `gif` | Output format: `gif`, `svg`, `cast` |
| `preset` | `hacker-mode` | Visual preset |
| `theme` | | Color theme (overrides preset) |
| `width` | `80` | Terminal width in columns |
| `height` | `24` | Terminal height in rows |
| `commit` | `true` | Auto-commit the generated file |
| `commit-message` | `chore: update README demo [readme-cinema]` | Commit message |

## CLI Reference

```
Usage: readme-cinema [file] [options]

Arguments:
  file                    Path to README file (default: ./README.md)

Options:
  -s, --speed <ms>        Typewriter speed in milliseconds (default: 50)
  -c, --color <theme>     Color theme (default: hacker)
  -p, --progress          Show progress bars for feature items
  --preset <name>         Apply a visual preset
  --gif [output]          Export demo GIF (requires agg)
  --svg [output]          Export demo SVG (requires svg-term-cli)
  --cast [output]         Export asciinema .cast recording
  --width <cols>          Terminal width for exports (default: 80)
  --height <rows>         Terminal height for exports (default: 24)
  --instant               Render without animation delays
  --no-banner             Skip ASCII title banner
  --no-transitions        Disable section transitions
  --no-clear              Don't clear terminal before rendering
  --list-themes           List available color themes
  --list-presets          List available presets
  -V, --version           Show version
  -h, --help              Show help
```

## Themes

8 built-in themes: `hacker`, `neon`, `classic`, `matrix`, `cyberpunk`, `retro`, `dark`, `rainbow`

```bash
readme-cinema --color matrix
readme-cinema --list-themes
```

## Programmatic API

```js
import { readmeCinema, generateDemo, getAvailablePresets, resolvePreset } from 'readme-cinema';

// Terminal playback
await readmeCinema('README.md', { color: 'neon', speed: 30 });

// Generate a .cast file
await generateDemo('README.md', 'demo.cast', { format: 'cast', preset: 'dramatic' });

// Generate a GIF (requires agg installed)
await generateDemo('README.md', 'demo.gif', { format: 'gif', banner: false });

// Resolve a preset to its config
const config = resolvePreset('hacker-mode');
// { speed: 15, color: 'matrix', progress: true, transitions: true, banner: true }
```

## Export Formats

| Format | Tool Required | Use Case |
|---|---|---|
| `.cast` | None | asciinema player, further conversion |
| `.gif` | [agg](https://github.com/asciinema/agg) | README embeds, social sharing |
| `.svg` | [svg-term-cli](https://github.com/marionebl/svg-term-cli) | Crisp, scalable animations |

### Installing Export Tools

```bash
# For GIF export (agg)
cargo install --git https://github.com/asciinema/agg

# For SVG export
npm install -g svg-term-cli
```

## Development

```bash
git clone https://github.com/beingmartinbmc/readme-cinema.git
cd readme-cinema
npm install

npm test              # Run tests with coverage
npm run lint          # ESLint
npm run dev           # Quick local demo
```

## License

MIT
