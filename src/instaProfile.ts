import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
require('dotenv').config();

puppeteer.use(StealthPlugin());

const url = "https://www.instagram.com/abhiram2k03/";

const main = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Wait for any img tag to appear
    await page.waitForSelector('img');
    
    // Extract the profile image source directly using page.evaluate
    const imageSrc = await page.evaluate(() => {
      const img = document.querySelector('img[alt="Profile photo"]') as HTMLImageElement;
      return img ? img.src : null;
    });
    
    if (imageSrc) {
      console.log("Profile image source:", imageSrc);
    } else {
      console.log("Profile image source not found");
    }
  } 
  catch (error) {
    console.error("Error occurred:", error);
  } 
  finally {
    if (browser) {
      await browser.close();
    }
  }
};

main();