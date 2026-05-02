export const Presets = {
  dramatic: {
    speed: 80,
    color: 'cyberpunk',
    progress: true,
    transitions: true,
    banner: true
  },

  'hacker-mode': {
    speed: 15,
    color: 'matrix',
    progress: true,
    transitions: true,
    banner: true
  },

  'startup-pitch': {
    speed: 40,
    color: 'neon',
    progress: true,
    transitions: true,
    banner: true
  },

  minimal: {
    speed: 0,
    color: 'dark',
    progress: false,
    transitions: false,
    banner: false
  },

  retro: {
    speed: 60,
    color: 'retro',
    progress: true,
    transitions: true,
    banner: true
  },

  rainbow: {
    speed: 35,
    color: 'rainbow',
    progress: true,
    transitions: true,
    banner: true
  }
};

export function getAvailablePresets() {
  return Object.keys(Presets);
}

export function resolvePreset(name) {
  return Presets[name] ?? null;
}
