export function createMockOutput() {
  const writes = [];
  const logs = [];
  const errors = [];

  return {
    writes,
    logs,
    errors,
    output: {
      write: (text) => writes.push(String(text)),
      log: (...args) => logs.push(args.map(String).join(' ')),
      error: (...args) => errors.push(args.map(String).join(' ')),
      clear: () => writes.push('[clear]')
    }
  };
}

export function createInstantRuntime(output) {
  return {
    output,
    sleep: async () => {},
    random: () => 0.5,
    instant: true
  };
}
