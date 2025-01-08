import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ConnectionService implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    this.checkDatabaseConnection();
  }

  async checkDatabaseConnection(): Promise<boolean> {
    if (this.dataSource.isInitialized) {
      Logger.log('Database connection is healthy', 'Database/Connection');
      return true;
    } else {
      Logger.error('Database connection check failed');
      return false;
    }
  }
}
