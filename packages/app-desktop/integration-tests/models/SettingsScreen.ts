
import { Page, Locator } from '@playwright/test';

export default class SettingsScreen {
	public readonly okayButton: Locator;
	public readonly appearanceTabButton: Locator;

	public constructor(private page: Page) {
		this.okayButton = page.locator('button', { hasText: 'OK' });
		this.appearanceTabButton = this.getTabLocator('Appearance');
	}

	public getTabLocator(tabName: string) {
		return this.page.locator('a[role="tab"] > span', { hasText: tabName });
	}

	public async waitFor() {
		await this.okayButton.waitFor();
		await this.appearanceTabButton.waitFor();
	}
}
