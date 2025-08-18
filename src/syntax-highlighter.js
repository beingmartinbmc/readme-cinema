import chalk from 'chalk';

export class SyntaxHighlighter {
  constructor(theme) {
    this.theme = theme;
    this.languageColors = {
      javascript: 'yellow',
      js: 'yellow',
      typescript: 'blue',
      ts: 'blue',
      python: 'green',
      py: 'green',
      java: 'red',
      cpp: 'magenta',
      c: 'magenta',
      csharp: 'magenta',
      cs: 'magenta',
      php: 'cyan',
      ruby: 'red',
      go: 'cyan',
      rust: 'yellow',
      swift: 'red',
      kotlin: 'blue',
      html: 'red',
      css: 'blue',
      json: 'yellow',
      yaml: 'cyan',
      yml: 'cyan',
      markdown: 'white',
      md: 'white',
      bash: 'green',
      shell: 'green',
      sh: 'green',
      sql: 'cyan',
      xml: 'red',
      dockerfile: 'blue',
      docker: 'blue'
    };
  }

  highlight(code, language = 'text') {
    if (!language || language === 'text') {
      return chalk[this.theme.code](code);
    }

    const lang = language.toLowerCase();
    const color = this.languageColors[lang] || this.theme.code;

    // Basic syntax highlighting patterns
    const patterns = this.getSyntaxPatterns(lang);
    
    let highlighted = code;
    
    // Apply syntax highlighting patterns
    for (const pattern of patterns) {
      const regex = new RegExp(pattern.regex, 'g');
      highlighted = highlighted.replace(regex, (match) => {
        return chalk[pattern.color](match);
      });
    }

    return chalk[color](highlighted);
  }

  getSyntaxPatterns(language) {
    const patterns = {
      javascript: [
        { regex: /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|async|await)\b/g, color: 'magenta' },
        { regex: /\b(true|false|null|undefined)\b/g, color: 'yellow' },
        { regex: /"[^"]*"/g, color: 'green' },
        { regex: /'[^']*'/g, color: 'green' },
        { regex: /`[^`]*`/g, color: 'green' },
        { regex: /\/\/.*$/gm, color: 'gray' },
        { regex: /\/\*[\s\S]*?\*\//g, color: 'gray' },
        { regex: /\b\d+\b/g, color: 'cyan' }
      ],
      python: [
        { regex: /\b(def|class|import|from|as|if|else|elif|for|while|try|except|finally|with|return|yield|lambda)\b/g, color: 'magenta' },
        { regex: /\b(True|False|None)\b/g, color: 'yellow' },
        { regex: /"[^"]*"/g, color: 'green' },
        { regex: /'[^']*'/g, color: 'green' },
        { regex: /#.*$/gm, color: 'gray' },
        { regex: /\b\d+\b/g, color: 'cyan' }
      ],
      html: [
        { regex: /<[^>]+>/g, color: 'magenta' },
        { regex: /"[^"]*"/g, color: 'green' },
        { regex: /'[^']*'/g, color: 'green' },
        { regex: /<!--[\s\S]*?-->/g, color: 'gray' }
      ],
      css: [
        { regex: /\b(color|background|margin|padding|border|font|display|position|width|height)\b/g, color: 'magenta' },
        { regex: /#[0-9a-fA-F]{3,6}/g, color: 'cyan' },
        { regex: /"[^"]*"/g, color: 'green' },
        { regex: /\/\*[\s\S]*?\*\//g, color: 'gray' }
      ],
      json: [
        { regex: /"[^"]*":/g, color: 'magenta' },
        { regex: /"[^"]*"/g, color: 'green' },
        { regex: /\b(true|false|null)\b/g, color: 'yellow' },
        { regex: /\b\d+\b/g, color: 'cyan' }
      ],
      yaml: [
        { regex: /^[a-zA-Z_][a-zA-Z0-9_]*:/gm, color: 'magenta' },
        { regex: /"[^"]*"/g, color: 'green' },
        { regex: /'[^']*'/g, color: 'green' },
        { regex: /#.*$/gm, color: 'gray' }
      ],
      bash: [
        { regex: /\b(if|then|else|fi|for|while|do|done|case|esac|function|return|exit)\b/g, color: 'magenta' },
        { regex: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, color: 'cyan' },
        { regex: /"[^"]*"/g, color: 'green' },
        { regex: /'[^']*'/g, color: 'green' },
        { regex: /#.*$/gm, color: 'gray' }
      ]
    };

    return patterns[language] || [];
  }

  highlightInline(code, language = 'text') {
    const lang = language.toLowerCase();
    const color = this.languageColors[lang] || this.theme.code;
    
    return chalk[color](code);
  }

  getLanguageColor(language) {
    const lang = language.toLowerCase();
    return this.languageColors[lang] || this.theme.code;
  }
}
