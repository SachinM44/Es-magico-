import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 10_000,
    pool: 'forks',
    fileParallelism: false,
  },
});
