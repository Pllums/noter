import { execSync } from "child_process";
import detect from "detect-port";

export async function setupE2eTest() {
	await startSupabase();
	reseedDb();
}

export async function signUp(
	page: Page,
	email: string,
	password: string,
	userName: string,
	skipUserName = false
) {
	const signUpButton = page.locator("button", { hasText: "Sign Up" }).first();
	await signUpButton.click();
	const emailInput = page.locator('input[name="email"]');
	await emailInput.fill(email);
	const passwordInput = page.locator('input[name="password"]');
	await passwordInput.fill(password);
	await page.keyboard.press("Enter");
	const welcomeNotice = page.locator("h2", { hasText: "Welcome to Supaship!" });
	await expect(welcomeNotice).toHaveCount(1);
	if (skipUserName) {
		return;
	}
	const usernameInput = page.locator('input[name="username"]');
	await usernameInput.fill(userName);
	const submitButton = page.locator("button", { hasText: "Submit" });
	await expect(submitButton).toBeEnabled();
	await page.keyboard.press("Enter");
	const logoutButton = page.locator("button", { hasText: "Logout" });
	await expect(logoutButton).toHaveCount(1);
}

export async function login(
	page: Page,
	email: string,
	password: string,
	username: string,
	loginButtonSelector = "button"
) {
	const signUpButton = page
		.locator(loginButtonSelector, { hasText: "Login" })
		.first();
	await signUpButton.click();
	const emailInput = page.locator('input[name="email"]');
	await emailInput.fill(email);
	const passwordInput = page.locator('input[name="password"]');
	await passwordInput.fill(password);
	const signUpSubmitButton = page.locator("button.supabase-ui-auth_ui-button");
	await signUpSubmitButton.nth(1).click();
	const logoutButton = page.locator("button", { hasText: "Logout" });
	await expect(logoutButton).toHaveCount(1);
	const usernameMention = page.locator("h2", { hasText: username });
	await expect(usernameMention).toHaveCount(1);
}

async function startSupabase() {
	const port = await detect(54321);
	if (port !== 54321) {
		return;
	}
	console.warn("Supabase is not running. Starting it now.");
	execSync("npx supabase start");
}

function reseedDb() {
	execSync(
		"PGPASSWORD=postgres psql -U postgres -h 127.0.0.1 -p 64322 -f supabase/clear-db-data.sql",
		{ stdio: "ignore" }
	);
}
