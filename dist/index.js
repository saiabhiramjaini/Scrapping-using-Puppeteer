"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const fs_1 = __importDefault(require("fs"));
const checkBot_1 = require("./checkBot");
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
const url = "https://books.toscrape.com/";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let browser;
    try {
        browser = yield puppeteer_extra_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto(url);
        const bookData = yield page.evaluate(() => {
            const books = document.querySelectorAll(".product_pod");
            const bookData = [];
            books.forEach((book) => {
                var _a, _b;
                const title = ((_a = book.querySelector("h3 > a")) === null || _a === void 0 ? void 0 : _a.getAttribute("title")) || "";
                const price = ((_b = book.querySelector(".price_color")) === null || _b === void 0 ? void 0 : _b.textContent) || "";
                bookData.push({ title, price });
            });
            return bookData;
        });
        console.log(bookData);
        fs_1.default.writeFile("books.json", JSON.stringify(bookData), (err) => {
            if (err) {
                console.error("Error occurred while writing to file:", err);
            }
            console.log("Data written to file");
        });
    }
    catch (error) {
        console.error("Error occurred:", error);
    }
    finally {
        if (browser) {
            yield browser.close();
        }
    }
});
main();
(0, checkBot_1.checkForBot)();
