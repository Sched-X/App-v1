import { Client } from 'pg';

export class DatabaseBase {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async query(sql: string, params: any[] = []) {
    return await this.client.query(sql, params);
  }

  async close(): Promise<void> {
    await this.client.end();
  }
}
