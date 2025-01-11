import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as PostEntity } from './post.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
