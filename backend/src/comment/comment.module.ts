import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment as CommentEntity } from './comment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
