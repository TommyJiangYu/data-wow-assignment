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

  async create(createPostInfo: CreatePostDto) {
    const post = await this.postRepository.create({ ...createPostInfo });

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

    queryBuilder.orderBy('post.created_at', 'DESC');
    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

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
    const selectedPost = await this.postRepository.findOne({ where: { id } });

    if (!selectedPost) {
      throw new NotFoundException('Post not found');
    }

    return selectedPost;
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
