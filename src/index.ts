import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from "fs";

import {checkForBot} from "./checkBot";

puppeteer.use(StealthPlugin());

const url = "https://books.toscrape.com/";

interface Book {
    title: string;
    price: string;
}

const main = async () => {  
    let browser;
    try {
        browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto(url);

        const bookData = await page.evaluate(() => {
            const books = document.querySelectorAll(".product_pod");

            const bookData: Book[] = [];
            books.forEach((book) => {
                const title = book.querySelector("h3 > a")?.getAttribute("title") || "";
                const price = book.querySelector(".price_color")?.textContent || "";
                bookData.push({ title, price });
            });
            
            return bookData;
        });
        console.log(bookData);
        fs.writeFile("books.json", JSON.stringify(bookData), (err)=>{
            if(err){
                console.error("Error occurred while writing to file:", err);
            }
            console.log("Data written to file");
        })
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

main();
checkForBot();