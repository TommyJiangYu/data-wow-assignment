import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  commentMessage: string;

  @IsNotEmpty()
  @IsInt()
  postId: number;
}
