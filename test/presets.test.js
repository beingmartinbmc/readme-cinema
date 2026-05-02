import { Presets, getAvailablePresets, resolvePreset } from '../src/presets.js';

describe('presets', () => {
  test('exports all preset names', () => {
    const presets = getAvailablePresets();
    expect(presets).toContain('dramatic');
    expect(presets).toContain('hacker-mode');
    expect(presets).toContain('startup-pitch');
    expect(presets).toContain('minimal');
    expect(presets).toContain('retro');
    expect(presets).toContain('rainbow');
    expect(presets).toHaveLength(6);
  });

  test('resolves known presets to their config', () => {
    const dramatic = resolvePreset('dramatic');
    expect(dramatic).toEqual({
      speed: 80,
      color: 'cyberpunk',
      progress: true,
      transitions: true,
      banner: true
    });

    const hackerMode = resolvePreset('hacker-mode');
    expect(hackerMode.speed).toBe(15);
    expect(hackerMode.color).toBe('matrix');

    const startupPitch = resolvePreset('startup-pitch');
    expect(startupPitch.color).toBe('neon');

    const minimal = resolvePreset('minimal');
    expect(minimal.progress).toBe(false);
    expect(minimal.transitions).toBe(false);
    expect(minimal.banner).toBe(false);
  });

  test('returns null for unknown presets', () => {
    expect(resolvePreset('nonexistent')).toBeNull();
    expect(resolvePreset('')).toBeNull();
    expect(resolvePreset(undefined)).toBeNull();
  });

  test('each preset has required keys', () => {
    const requiredKeys = ['speed', 'color', 'progress', 'transitions', 'banner'];
    for (const name of getAvailablePresets()) {
      const preset = Presets[name];
      for (const key of requiredKeys) {
        expect(preset).toHaveProperty(key);
      }
    }
  });
});
