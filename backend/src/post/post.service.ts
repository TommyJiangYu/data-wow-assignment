import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { QueryParams } from 'src/pagination/types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostInfo: CreatePostDto, userId) {
    const post = await this.postRepository.create({
      ...createPostInfo,
      user: userId,
    });

    return this.postRepository.save(post);
  }

  async findAll(queryParams: PaginationDto & QueryParams) {
    const { limit, page, ...filters } = queryParams;
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    if (filters.search) {
      queryBuilder.where(
        '(post.title LIKE :search OR post.detail LIKE :search)',
        {
          search: `%${filters.search}%`,
        },
      );
    }

    if (filters.communityType) {
      queryBuilder.andWhere('post.communityType = :communityType', {
        communityType: filters.communityType,
      });
    }

    queryBuilder
      .loadRelationCountAndMap('post.totalComment', 'post.comments')
      .orderBy('post.created_at', 'DESC')
      .addSelect(['user.id', 'user.name', 'user.imgProfile'])
      .leftJoin('post.user', 'user')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();
    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  async findOne({ id }: { id: number }) {
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder
      .where('post.id = :id', { id })
      .addSelect(['user.id', 'user.name', 'user.imgProfile'])
      .leftJoin('post.user', 'user');

    queryBuilder
      .addSelect(['comment.id', 'comment.commentMessage', 'comment.created_at'])
      .orderBy('comment.created_at', 'DESC')
      .leftJoin('post.comments', 'comment');

    queryBuilder
      .addSelect([
        'commentUser.id',
        'commentUser.name',
        'commentUser.imgProfile',
      ])
      .leftJoin('comment.user', 'commentUser');

    const selectedPost = await queryBuilder.getOne();

    if (!selectedPost) {
      throw new NotFoundException('Post not found');
    }

    return selectedPost;
  }

  async findByUserId(queryParams: PaginationDto & QueryParams, userId) {
    const { limit, page } = queryParams;
    const queryBuilder = this.postRepository.createQueryBuilder('post');

    queryBuilder
      .where('post.userId = :userId', { userId })
      .loadRelationCountAndMap('post.totalComment', 'post.comments')
      .orderBy('post.created_at', 'DESC')
      .addSelect(['user.id', 'user.name', 'user.imgProfile'])
      .leftJoin('post.user', 'user')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();
    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  async update({
    id,
    updatePostInfo,
  }: {
    id: number;
    updatePostInfo: UpdatePostDto;
  }) {
    const selectedPost = await this.findOne({ id });

    return await this.postRepository.save({
      ...selectedPost,
      ...updatePostInfo,
    });
  }

  async remove({ id }: { id: number }) {
    const selectedPost = await this.findOne({ id });

    await this.postRepository.remove(selectedPost);

    return {
      message: `Delete post successfully`,
    };
  }
}
