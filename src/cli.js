import { Command, InvalidArgumentError } from 'commander';
import fs from 'fs-extra';
import { readmeCinema, getAvailableThemes } from './index.js';
import { getAvailablePresets, resolvePreset } from './presets.js';
import { generateDemo } from './recorder.js';

const packageJson = fs.readJsonSync(new URL('../package.json', import.meta.url));

export function parseSpeed(value) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 0 || String(parsed) !== String(value).trim()) {
    throw new InvalidArgumentError('Speed must be a non-negative integer');
  }

  return parsed;
}

function writeOutput(output, method, text) {
  if (typeof output[method] === 'function') {
    output[method](text);
    return;
  }

  if (typeof output.write === 'function') {
    output.write(`${text}\n`);
  }
}

export function createProgram({ action = readmeCinema, output = console } = {}) {
  const program = new Command();

  program
    .name('readme-cinema')
    .description(packageJson.description)
    .version(packageJson.version)
    .argument('[file]', 'Path to the README file', './README.md')
    .option('-s, --speed <ms>', 'Typewriter speed in milliseconds', parseSpeed, 50)
    .option('-c, --color <theme>', `Color theme: ${getAvailableThemes().join(', ')}`, 'hacker')
    .option('-p, --progress', 'Show deterministic progress bars for feature-like list items', false)
    .option('-t, --transitions', 'Enable dramatic section transitions', true)
    .option('--no-transitions', 'Disable dramatic section transitions')
    .option('--banner', 'Show the ASCII title banner', true)
    .option('--no-banner', 'Skip the ASCII title banner')
    .option('--clear', 'Clear the terminal before rendering', true)
    .option('--no-clear', 'Do not clear the terminal before rendering')
    .option('--instant', 'Render without animation delays')
    .option('--list-themes', 'Print available color themes and exit')
    .option('--preset <name>', `Apply a preset: ${getAvailablePresets().join(', ')}`)
    .option('--list-presets', 'Print available presets and exit')
    .option('--gif [output]', 'Export a demo GIF (requires agg)')
    .option('--svg [output]', 'Export a demo SVG (requires svg-term-cli)')
    .option('--cast [output]', 'Export an asciinema .cast recording')
    .option('--width <cols>', 'Terminal width for exports', parseSpeed, 80)
    .option('--height <rows>', 'Terminal height for exports', parseSpeed, 24)
    .configureOutput({
      writeOut: (text) => writeOutput(output, 'log', text.trimEnd()),
      writeErr: (text) => writeOutput(output, 'error', text.trimEnd())
    })
    .action(async (file, options) => {
      if (options.listThemes) {
        writeOutput(output, 'log', getAvailableThemes().join('\n'));
        return;
      }

      if (options.listPresets) {
        writeOutput(output, 'log', getAvailablePresets().join('\n'));
        return;
      }

      let mergedOptions = {
        speed: options.speed,
        color: options.color,
        progress: options.progress,
        transitions: options.transitions,
        banner: options.banner,
        clearScreen: options.clear,
        instant: options.instant
      };

      if (options.preset) {
        const preset = resolvePreset(options.preset);
        if (!preset) {
          writeOutput(output, 'error', `Unknown preset '${options.preset}'. Try --list-presets.`);
          process.exitCode = 1;
          return;
        }
        mergedOptions = { ...mergedOptions, ...preset };
      }

      if (!getAvailableThemes().includes(mergedOptions.color)) {
        writeOutput(output, 'error', `Unknown color theme '${mergedOptions.color}'. Try --list-themes.`);
        process.exitCode = 1;
        return;
      }

      if (!(await fs.pathExists(file))) {
        writeOutput(output, 'error', `Error: File '${file}' not found`);
        writeOutput(output, 'log', 'Try: readme-cinema --help for usage information');
        process.exitCode = 1;
        return;
      }

      const isExport = options.gif || options.svg || options.cast;

      if (isExport) {
        const format = options.gif ? 'gif' : options.svg ? 'svg' : 'cast';
        const defaultExt = { gif: '.gif', svg: '.svg', cast: '.cast' }[format];
        const exportValue = options.gif || options.svg || options.cast;
        const outputPath = typeof exportValue === 'string'
          ? exportValue
          : file.replace(/\.[^.]+$/, defaultExt);

        try {
          writeOutput(output, 'log', `Recording ${format.toUpperCase()} demo...`);
          const result = await generateDemo(file, outputPath, {
            ...mergedOptions,
            format,
            width: options.width,
            height: options.height
          });
          writeOutput(output, 'log', `Saved ${result.format.toUpperCase()} to ${result.outputPath} (${result.eventCount} frames)`);
        } catch (err) {
          writeOutput(output, 'error', `Export failed: ${err.message}`);
          process.exitCode = 1;
        }
        return;
      }

      await action(file, mergedOptions);
    });

  return program;
}

export async function runCli(argv = process.argv, dependencies = {}) {
  const program = createProgram(dependencies);
  await program.parseAsync(argv);
}
