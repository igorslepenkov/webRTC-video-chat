import { DataSource } from 'typeorm';
import { datasourceOptions } from './datasourceOptions';

const dataSource = new DataSource(datasourceOptions);
export default dataSource;
