import { registerAs } from '@nestjs/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';

dotenvConfig({
  path: isDevelopment ? '.env' : path.resolve(__dirname, `../.env.${env}`),
});

const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts}'],
  subscribers: [],
  migrationsTableName: 'migrations',
};

export default registerAs('ormconfig', () => config);
export const AppDataSource = new DataSource(config as DataSourceOptions);
