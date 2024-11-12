import mysql from 'mysql2/promise';

let koneksi;

export const koneksiDB = async () => {
  if (!koneksi) {
    koneksi = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }
  return koneksiDB;
};