import { config } from "dotenv";
config();

export const BD_HOST = process.env.BD_HOST || "152.70.155.197";
export const BD_DATABASE = process.env.BD_DATABASE || "defaultdb";
export const DB_USER = process.env.DB_USER || "avnadmin";
export const DB_PASSWORD =
  process.env.DB_PASSWORD || "AVNS_Igq0NBWFG2akk5Rdf7n";
export const DB_PORT = process.env.DB_PORT || 18037;
export const PORT = process.env.PORT || 3000;