from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Handle Dialogs
        page.on("dialog", lambda dialog: dialog.accept())

        print("Navigating to app...")
        page.goto("http://localhost:8080")

        page.wait_for_selector('text=Welcome to AutoInsta')
        page.screenshot(path="welcome_screen.png")
        print("Welcome Screen captured.")

        page.click('text=Get Started')
        page.wait_for_selector('text=Account Generation Setup')
        page.screenshot(path="setup_screen.png")
        print("Setup Screen captured.")

        # Fill Form
        page.fill('input[placeholder="Enter password for new accounts"]', 'password123')
        # The email input is present by default
        page.fill('input[placeholder="example@gmail.com"]', 'test@example.com')

        print("Clicking Start Generation...")
        page.click('text=Start Generation')

        # The Alert callback should navigate to Dashboard.
        # Since it's a SPA, we don't expect a page reload, just a DOM change.
        # We wait for Dashboard element.
        print("Waiting for Dashboard...")
        try:
            page.wait_for_selector('text=Generation Progress', timeout=5000)
            page.screenshot(path="dashboard_screen.png")
            print("Dashboard captured.")
        except Exception as e:
            print(f"Failed to reach dashboard: {e}")
            page.screenshot(path="error_state.png")

        browser.close()

if __name__ == "__main__":
    verify_app()
