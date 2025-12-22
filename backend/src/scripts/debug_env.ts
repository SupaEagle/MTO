
import * as dotenv from 'dotenv';
dotenv.config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_PASSWORD Length:", process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0);
