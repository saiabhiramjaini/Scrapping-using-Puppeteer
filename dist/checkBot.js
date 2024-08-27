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
exports.checkForBot = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = "https://bot.sannysoft.com/";
const checkForBot = () => __awaiter(void 0, void 0, void 0, function* () {
    let browser;
    try {
        browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        yield page.goto(url);
        yield page.screenshot({ path: "bot.png" });
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
exports.checkForBot = checkForBot;
module.exports = { checkForBot: exports.checkForBot };
