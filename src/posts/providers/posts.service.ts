import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting the PostsRepository to interact with the database
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    /**
     * Injecting the MetaOptionsRepository to interact with the database
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    /**
     * Injecting the UsersService to get user information
     */
    private readonly usersService: UsersService,

    /**
     * Ingect TagsService
     */
    private readonly tagsService: TagsService,

    /**
     * Injecting pagination provider
     */
    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Creating new posts
   */
  public async create(createPostDto: CreatePostDto) {
    let author = await this.usersService.findOneById(createPostDto.authorId);
    let tags = await this.tagsService.findMultipleTags(
      createPostDto.tags ?? [],
    );
    if (author === null) return false;
    let post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });
    return await this.postsRepository.save(post);
  }

  /**
   * Editing a post
   */
  public async update(patchPostDto: PatchPostDto) {
    let tags = await this.tagsService.findMultipleTags(patchPostDto.tags ?? []);
    let post = await this.postsRepository.findOneBy({ id: patchPostDto.id });

    // update properties
    if (post === null) return false;
    post.title = patchPostDto.title ?? post?.title;
    post.content = patchPostDto.content ?? post?.content;
    post.status = patchPostDto.status ?? post?.status;
    post.postType = patchPostDto.postType ?? post?.postType;
    post.slug = patchPostDto.slug ?? post?.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post?.featuredImageUrl;
    post.tags = tags;

    return await this.postsRepository.save(post);
  }

  /*
   * Getting all the posts
   */
  public async findAll(
    userId: string,
    postQuery: GetPostsDto,
  ): Promise<Paginated<Post>> {
    return await this.paginationProvider.paginateQuery(
      {
        page: postQuery.page,
        limit: postQuery.limit,
      },
      this.postsRepository,
    );
  }

  /**
   * Deleting a post
   */
  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }
}
