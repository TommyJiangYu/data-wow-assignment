import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { QueryParams } from 'src/pagination/types';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() queryParams: PaginationDto & QueryParams) {
    return this.postService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne({ id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postService.create(createPostDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update({ id, updatePostInfo: updatePostDto });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.postService.remove({ id });
  }
}
