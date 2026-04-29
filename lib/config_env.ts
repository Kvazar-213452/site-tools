import * as dotenv from "dotenv";

dotenv.config();

export default class Config {
    static getApiDeepSeek(): string {
        const key = process.env.API_DEEPSEEK;

        if (!key) {
            throw new Error("API_DEEPSEEK is not defined in .env");
        }

        return key;
    }
}