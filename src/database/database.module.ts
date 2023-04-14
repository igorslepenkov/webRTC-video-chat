import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { datasourceOptions } from './datasourceOptions';

@Module({
  imports: [TypeOrmModule.forRoot(datasourceOptions)],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}
