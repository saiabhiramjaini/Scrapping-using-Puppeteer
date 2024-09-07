import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
require('dotenv').config();

puppeteer.use(StealthPlugin());

const url = "https://www.instagram.com/";
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    // Login
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', process.env.USERNAME!);
    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', process.env.PASSWORD!);
    await wait(2000);
    await page.click('button[type="submit"]');

    // Wait for navigation after login
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Handle potential "Save Login Info" popup
    try {
      await page.waitForSelector('div[role="button"][tabindex="0"]', { timeout: 5000 });
      await page.click('div[role="button"][tabindex="0"]');
    } catch (error) {
      console.log("'Save Login Info' popup not found, continuing...");
    }

    // Handle potential "Turn on Notifications" popup
    try {
      await page.waitForSelector('button._a9-- ', { timeout: 5000 });
      await page.evaluate(() => {
        const buttons = document.querySelectorAll('button._a9-- ');
        for (const button of buttons) {
          if (button.textContent?.includes('Not Now')) {
            (button as HTMLElement).click();
            break;
          }
        }
      });
    } catch (error) {
      console.log("'Turn on Notifications' popup not found, continuing...");
    }
    
    await page.waitForSelector('article', { timeout: 30000 });
    console.log("Successfully logged in and navigated through popups!");
    await wait(5000);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

main();
