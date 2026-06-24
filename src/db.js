import { createPool } from "mysql2/promise";

export const conmysql = createPool({
  host: "mysql-base2026-juniorpihuavebase.a.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_Igq0NBWFG2akk5Rdf7n",
  database: "defaultdb",
  port: 18037,
  ssl: {
    rejectUnauthorized: false,
  },
});
