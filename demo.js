#!/usr/bin/env node

import { readmeCinema } from './src/index.js';

console.log('🎬 README Cinema Demo\n');

// Demo different themes
const themes = ['hacker', 'neon', 'classic', 'matrix', 'cyberpunk', 'retro', 'dark', 'rainbow'];

async function runDemo() {
  for (const theme of themes) {
    console.log(`\n🎨 Testing ${theme.toUpperCase()} theme...`);
    console.log('='.repeat(50));
    
    try {
      await readmeCinema('./README.md', {
        speed: 30,
        color: theme,
        progress: true,
        transitions: true
      });
      
      // Wait between themes
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error with ${theme} theme:`, error.message);
    }
  }
  
  console.log('\n🎉 Demo complete! All themes tested successfully.');
}

runDemo().catch(console.error);
