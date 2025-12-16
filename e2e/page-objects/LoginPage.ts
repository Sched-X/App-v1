import { BasePage } from './BasePage';
import { DashboardPage } from './DashboardPage';

export class LoginPage extends BasePage {
  private emailInput = '//input[@id="email"]';
  private passwordInput = '//input[@id="password"]';
  private loginButton = '//button[contains(.,"Login")]';
  private successMessage = 'text=Logged in successfully!';

  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  async fillEmail(email: string): Promise<void> {
    await this.type(this.emailInput, email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.type(this.passwordInput, password);
  }

  async submit(): Promise<void> {
    await this.click(this.loginButton);
  }

  async assertLoggedIn(): Promise<void> {
    await this.assertVisible(this.successMessage);
  }

  async login(email: string, password: string): Promise<DashboardPage> {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
    await this.assertLoggedIn();
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.expectDashboardVisible();
    return dashboardPage;
  }
}
