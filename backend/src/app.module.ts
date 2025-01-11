import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormconfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionModule } from './connection/connection.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: env === 'development' ? '.env' : `.env.${env}`,
      load: [ormconfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('ormconfig'),
    }),
    ConnectionModule,
    PostModule,
    UserModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
