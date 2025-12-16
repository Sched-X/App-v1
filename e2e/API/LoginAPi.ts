import { BaseApi } from './BaseAPI';
import { DatabaseBase } from './DataBaseSetup';

export class LoginApi extends BaseApi {
  private loginPath = '/auth/login';

  async login(email: string, password: string) {
    const response = await this.post(this.loginPath, { email, password });

    await this.assertStatus(response, 200);

    const body = await response.json();
    return body;
  }
}

export class LoginApiDataBase extends BaseApi {
  private loginPath = '/auth/login';

  async login(email: string, password: string) {
    const response = await this.post(this.loginPath, { email, password });
    await this.assertStatus(response, 200);

    const body = await response.json();

    await this.validateUserInDB(email);

    return body;
  }

  private async validateUserInDB(email: string) {
    const db = new DatabaseBase();
    await db.connect();

    const result = await db.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);

    await db.close();

    if (result.rows.length === 0) {
      throw new Error(`User record not found in DB for: ${email}`);
    }
  }
}
