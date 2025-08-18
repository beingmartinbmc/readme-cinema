#!/usr/bin/env node

import { readmeCinema } from './src/index.js';
import fs from 'fs-extra';

// Create a sample README for demo
const sampleReadme = `# 🚀 My Awesome Project

A revolutionary tool that transforms the way you interact with documentation.

## ✨ Features

- **Lightning Fast** - Built for speed and efficiency
- **Cross Platform** - Works on Windows, Mac, and Linux  
- **Easy Integration** - Simple API for developers
- **Real-time Updates** - Live synchronization across devices
- **Advanced Analytics** - Deep insights into usage patterns
- **Customizable Themes** - Personalize your experience

## 🛠️ Installation

\`\`\`bash
npm install my-awesome-project
\`\`\`

## 🎮 Quick Start

\`\`\`javascript
import { AwesomeProject } from 'my-awesome-project';

const project = new AwesomeProject({
  apiKey: 'your-api-key',
  environment: 'production'
});

await project.initialize();
\`\`\`

## 🎨 Configuration

\`\`\`yaml
# config.yaml
api:
  endpoint: https://api.my-awesome-project.com
  timeout: 5000
  retries: 3

features:
  analytics: true
  realtime: true
  themes: ['dark', 'light', 'custom']
\`\`\`

## 📊 API Reference

### Methods
- \`initialize()\` - Initialize the project
- \`processData(input)\` - Process input data
- \`getAnalytics()\` - Retrieve analytics data
- \`updateTheme(theme)\` - Update the current theme

### Events
- \`ready\` - Fired when initialization is complete
- \`dataProcessed\` - Fired when data processing is complete
- \`error\` - Fired when an error occurs

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ by the community
`;

async function runQuickDemo() {
  try {
    // Write sample README to temp file
    await fs.writeFile('./demo-readme.md', sampleReadme);
    
    console.log('🎬 README Cinema Quick Demo\n');
    console.log('This will show you the cinematic experience with a sample README...\n');
    
    // Run the demo with different themes
    const themes = ['hacker', 'neon', 'cyberpunk'];
    
    for (const theme of themes) {
      console.log(`\n🎨 Testing ${theme.toUpperCase()} theme...`);
      console.log('='.repeat(50));
      
      await readmeCinema('./demo-readme.md', {
        speed: 40,
        color: theme,
        progress: true,
        transitions: true
      });
      
      // Wait between themes
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Clean up
    await fs.remove('./demo-readme.md');
    
    console.log('\n🎉 Demo complete! Try it with your own README:');
    console.log('readme-cinema --color neon --progress');
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
  }
}

runQuickDemo();
