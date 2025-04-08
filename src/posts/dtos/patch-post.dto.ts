import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    example: 1,
    description: 'The ID of the post to update',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
