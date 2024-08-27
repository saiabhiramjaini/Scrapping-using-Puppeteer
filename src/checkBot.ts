import puppeteer from "puppeteer";

const url = "https://bot.sannysoft.com/";

export const checkForBot = async () => {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto(url);

        await page.screenshot({path: "bot.png"});
    } 
    catch (error) {
        console.error("Error occurred:", error);
    } 
    finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = {checkForBot};