import fs from 'fs-extra';
import { marked } from 'marked';
import { AsciiBanner } from './ascii-banner.js';
import { TypewriterEffect } from './typewriter-effect.js';
import { SectionTransitions } from './section-transitions.js';
import { SyntaxHighlighter } from './syntax-highlighter.js';
import { ProgressBars } from './progress-bars.js';
import { ColorThemes } from './color-themes.js';

export async function readmeCinema(filePath, options = {}) {
  const {
    speed = 50,
    color = 'hacker',
    progress = false,
    transitions = true
  } = options;

  // Set up color theme
  const theme = ColorThemes[color] || ColorThemes.hacker;
  
  try {
    // Read the README file
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Parse markdown
    const tokens = marked.lexer(content);
    
    // Initialize components
    const banner = new AsciiBanner(theme);
    const typewriter = new TypewriterEffect(speed, theme);
    const transitionsManager = new SectionTransitions(theme);
    const highlighter = new SyntaxHighlighter(theme);
    const progressBars = new ProgressBars(theme);
    
    // Start the cinematic experience
    console.clear();
    
    // 1. ASCII Banner
    await banner.display();
    
    // 2. Process each section
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      // Add dramatic transitions between major sections
      if (transitions && i > 0 && isMajorSection(token, tokens[i - 1])) {
        await transitionsManager.transition();
      }
      
      // Process different token types
      switch (token.type) {
        case 'heading':
          await processHeading(token, typewriter, theme);
          break;
        case 'paragraph':
          await processParagraph(token, typewriter, theme);
          break;
        case 'code':
          await processCode(token, highlighter, typewriter, theme);
          break;
        case 'list':
          await processList(token, typewriter, theme, progressBars, progress);
          break;
        case 'blockquote':
          await processBlockquote(token, typewriter, theme);
          break;
        default:
          // Handle other token types
          if (token.text) {
            await typewriter.type(token.text, theme.text);
          }
      }
    }
    
    // Final flourish
    await typewriter.type('\n\n🎬 README Cinema Complete! 🎬\n', theme.accent);
    
  } catch (error) {
    throw new Error(`Failed to process README: ${error.message}`);
  }
}

function isMajorSection(currentToken, previousToken) {
  return currentToken.type === 'heading' && 
         currentToken.depth <= 2 && 
         previousToken.type !== 'heading';
}

async function processHeading(token, typewriter, theme) {
  const prefix = '#'.repeat(token.depth);
  const heading = `${prefix} ${token.text}`;
  await typewriter.type(heading, theme.heading);
  await typewriter.type('\n\n', theme.text);
}

async function processParagraph(token, typewriter, theme) {
  await typewriter.type(token.text, theme.text);
  await typewriter.type('\n\n', theme.text);
}

async function processCode(token, highlighter, typewriter, theme) {
  if (token.lang) {
    // Code block with language
    await typewriter.type(`\n\`\`\`${token.lang}\n`, theme.code);
    const highlighted = highlighter.highlight(token.text, token.lang);
    await typewriter.type(highlighted, theme.code);
    await typewriter.type('\n```\n\n', theme.code);
  } else {
    // Inline code
    await typewriter.type(`\`${token.text}\``, theme.code);
  }
}

async function processList(token, typewriter, theme, progressBars, showProgress) {
  for (let i = 0; i < token.items.length; i++) {
    const item = token.items[i];
    const marker = token.ordered ? `${i + 1}.` : '•';
    
    await typewriter.type(`${marker} `, theme.list);
    
    // Check if this looks like a feature with progress
    if (showProgress && isFeatureItem(item.text)) {
      await processFeatureWithProgress(item, typewriter, theme, progressBars);
    } else {
      await typewriter.type(item.text, theme.text);
    }
    
    await typewriter.type('\n', theme.text);
  }
  await typewriter.type('\n', theme.text);
}

async function processBlockquote(token, typewriter, theme) {
  await typewriter.type('> ', theme.blockquote);
  await typewriter.type(token.text, theme.blockquote);
  await typewriter.type('\n\n', theme.text);
}

function isFeatureItem(text) {
  const featureKeywords = ['feature', 'capability', 'functionality', 'support', 'integration'];
  return featureKeywords.some(keyword => 
    text.toLowerCase().includes(keyword)
  );
}

async function processFeatureWithProgress(item, typewriter, theme, progressBars) {
  const featureName = item.text;
  const progress = Math.floor(Math.random() * 40) + 60; // 60-100%
  
  await typewriter.type(featureName, theme.text);
  await typewriter.type(' ', theme.text);
  
  await progressBars.showProgress(featureName, progress);
}
