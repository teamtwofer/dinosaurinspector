import { DatabaseConfig } from '../database.config';
import { DatabaseService } from '../database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    service = new DatabaseService(new DatabaseConfig());
  });

  afterEach(async () => {
    (await service.connection).close();
  });

  it('should have a connection', async () => {
    expect(await service.connection).toBeDefined();
  });

  it('should only define the connection once', async () => {
    const connection = await service.connection;
    expect(await service.connection).toBe(connection);
  });
});
