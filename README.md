# README Cinema

Transform a Markdown README into a cinematic terminal presentation with ASCII art, typewriter text, syntax-colored code blocks, scene transitions, and optional feature progress bars.

## Quick Start

```bash
npm install -g readme-cinema
readme-cinema
```

Run it against any Markdown file:

```bash
readme-cinema ./docs/intro.md --color neon --progress --speed 30
```

Use `--instant` when you want a fast preview without animation delays:

```bash
readme-cinema README.md --instant --no-clear
```

## Features

- Cinematic ASCII title banner with a glitch reveal.
- Typewriter rendering with natural punctuation, space, number, and capitalization pacing.
- Scene transitions between major Markdown sections.
- Syntax-colored fenced code blocks for JavaScript, TypeScript, Python, HTML, CSS, JSON, YAML, Bash, and more.
- Deterministic progress bars for feature-like list items.
- Eight terminal themes: `hacker`, `neon`, `classic`, `matrix`, `cyberpunk`, `retro`, `dark`, and `rainbow`.
- Testable programmatic API with injectable output, sleep, and randomness for deterministic automation.

## CLI

```bash
readme-cinema [file] [options]
```

`file` defaults to `./README.md`.

| Option | Description | Default |
| --- | --- | --- |
| `-s, --speed <ms>` | Typewriter speed in milliseconds. Must be a non-negative integer. | `50` |
| `-c, --color <theme>` | Theme name. Run `--list-themes` to see valid values. | `hacker` |
| `-p, --progress` | Add progress bars to feature-like list items. | `false` |
| `-t, --transitions` | Enable scene transitions. | `true` |
| `--no-transitions` | Disable scene transitions. | |
| `--banner` / `--no-banner` | Show or skip the ASCII banner. | `true` |
| `--clear` / `--no-clear` | Clear or preserve the terminal before rendering. | `true` |
| `--instant` | Skip animation delays for previews and automation. | `false` |
| `--list-themes` | Print available themes and exit. | |

## Examples

```bash
# Cyberpunk-style preview
readme-cinema README.md --color neon --progress --instant

# Matrix mode with full cinematic timing
readme-cinema README.md --color matrix --transitions

# Quiet preview that keeps existing terminal output visible
readme-cinema README.md --instant --no-banner --no-clear --no-transitions
```

## Programmatic Usage

```javascript
import { readmeCinema, getAvailableThemes } from 'readme-cinema';

console.log(getAvailableThemes());

const summary = await readmeCinema('./README.md', {
  speed: 30,
  color: 'hacker',
  progress: true,
  transitions: true,
  instant: false
});

console.log(summary);
```

`readmeCinema()` resolves with a small summary:

```javascript
{
  filePath: './README.md',
  theme: 'hacker',
  tokensProcessed: 12
}
```

For tests or custom renderers, pass an output adapter:

```javascript
await readmeCinema('./README.md', {
  instant: true,
  output: {
    write: (text) => process.stdout.write(text),
    log: (...args) => console.log(...args),
    error: (...args) => console.error(...args),
    clear: () => {}
  }
});
```

## Development

```bash
npm ci
npm run lint
npm run test:ci
npm run build
```

The Jest configuration enforces at least 90% global coverage for statements, branches, functions, and lines. The current suite is deterministic and runs the animation code in instant mode.

## Release

1. Make changes on a feature branch.
2. Run `npm run lint`, `npm run test:ci`, `npm run build`, and `npm audit --audit-level=moderate`.
3. Update `package.json` with the next version.
4. Tag the release as `vX.Y.Z`.
5. Publish to npm and create GitHub release notes from the tag.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Author

Ankit Sharma - [ankit.sharma199803@gmail.com](mailto:ankit.sharma199803@gmail.com)
