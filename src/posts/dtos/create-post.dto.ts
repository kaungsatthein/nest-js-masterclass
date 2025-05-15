import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatusType.enum';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tag } from 'src/tags/tag.entity';

export class CreatePostDto {
  @ApiProperty({
    example: 'Post 1',
    description: 'The title of the post',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: postType.POST,
    description: 'Possible values, "post", "page", "story", "series"',
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    example: 'slug-1',
    description: 'The slug of the post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z]+(?:-[a-z]+)*$/, { message: 'Invalid slug' })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    example: postStatus.PUBLISHED,
    description: 'Possible values, "draft", "scheduled", "review", "published"',
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    example: 'Content 1',
    description: 'The content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    example:
      '{\r\n    \"@context\": \"https:\/\/schema.org\",\r\n    \"@type\": \"Person\"\r\n  }',
    description: 'The schema of the post',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'The featured image of the post',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The publish date of the post',
  })
  @IsOptional()
  @IsISO8601()
  publishOn?: Date;

  @ApiPropertyOptional({
    example: [1, 2],
    description: 'The Array Tag of the post',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The meta value of the post',
          example: '{"sidebarEnabled": true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto;

  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
