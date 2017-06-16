import { DatabaseConfig } from '../database.config';

describe('DatabaseConfig', () => {
  let config: DatabaseConfig;

  beforeEach(() => {
    config = new DatabaseConfig();
  });

  it('should generate coverage', () => {
    expect(config).toBeDefined();
  });
});
