import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { createPostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/{:userId}')
  public getPosts(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.findAll(userId);
  }
  @Post()
  public createPost(@Body() createPostDto: createPostDto) {
    return createPostDto;
  }
}
