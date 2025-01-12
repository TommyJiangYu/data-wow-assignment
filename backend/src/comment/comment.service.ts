import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment as CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async findOne({ id }: { id: number }) {
    const selectedComment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!selectedComment) {
      throw new NotFoundException('Comment not found');
    }

    return selectedComment;
  }

  async create(createCommentInfo: CreateCommentDto, userId) {
    const comment = await this.commentRepository.create({
      ...createCommentInfo,
      user: { id: userId },
      post: { id: createCommentInfo.postId },
    });

    return this.commentRepository.save(comment);
  }

  async update({
    id,
    updateCommentInfo,
  }: {
    id: number;
    updateCommentInfo: UpdateCommentDto;
  }) {
    const selectedComment = await this.findOne({ id });

    return await this.commentRepository.save({
      ...selectedComment,
      ...updateCommentInfo,
    });
  }

  async remove({ id }: { id: number }) {
    const selectedComment = await this.findOne({ id });

    await this.commentRepository.remove(selectedComment);

    return {
      message: `Delete comment successfully`,
    };
  }
}
