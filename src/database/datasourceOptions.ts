import { DataSourceOptions } from 'typeorm';
import { Meeting } from '../meetings/entities';

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST!,
  port: Number(process.env.POSTGRES_PORT!),
  username: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DB!,
  entities: [Meeting],
  synchronize: true,
};

export default datasourceOptions;
