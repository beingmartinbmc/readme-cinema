#!/usr/bin/env node

import { Command } from 'commander';
import { readmeCinema } from '../src/index.js';

const program = new Command();

program
  .name('readme-cinema')
  .description('Transform your README files into cinematic terminal experiences')
  .version('1.0.0')
  .argument('[file]', 'Path to the README file (default: ./README.md)', './README.md')
  .option('-s, --speed <speed>', 'Typewriter speed in milliseconds (default: 50)', '50')
  .option('-c, --color <theme>', 'Color theme: hacker, neon, classic, matrix, cyberpunk, retro, dark, rainbow (default: hacker)', 'hacker')
  .option('-p, --progress', 'Show progress bars for features', false)
  .option('-t, --transitions', 'Enable dramatic section transitions', true)
  .action(async (file, options) => {
    try {
      // Validate file exists
      const fs = await import('fs-extra');
      if (!(await fs.pathExists(file))) {
        console.error(`❌ Error: File '${file}' not found`);
        console.log('💡 Try: readme-cinema --help for usage information');
        process.exit(1);
      }
      
      await readmeCinema(file, options);
    } catch (error) {
      console.error('❌ Error:', error.message);
      console.log('💡 Try: readme-cinema --help for usage information');
      process.exit(1);
    }
  });

program.parse();
