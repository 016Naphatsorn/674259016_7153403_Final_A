import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL;

const options = {
  dialect: "postgres",
  logging: false,
  ...(isProduction
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {}),
};

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, options)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        ...options,
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
      },
    );

export const connectDB = async () => {
  console.log("Connecting to PostgreSQL...");
  await sequelize.authenticate();
  console.log("PostgreSQL connected successfully!");
  await sequelize.sync();
  console.log("Database tables synchronized!");
};
