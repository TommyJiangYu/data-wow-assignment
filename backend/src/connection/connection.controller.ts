import { Controller, Get, Logger } from '@nestjs/common';
import { ConnectionService } from './connection.service';

@Controller('connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Get('/test')
  testConnection() {
    Logger.log('Connection successful', 'Connection/test');

    return {
      success: true,
      message: 'Connection successful',
    };
  }

  @Get('/db/test')
  async testDBConnection() {
    const dbConnection = await this.connectionService.checkDatabaseConnection();

    if (dbConnection) {
      return {
        success: dbConnection,
        message: 'Database Connection successful',
      };
    } else {
      return {
        success: dbConnection,
        message: 'Database Connection failed',
      };
    }
  }
}
