import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Injecting the Tag repository to interact with the database.
     */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  /**
   * Method to get mulitple tags from database
   */
  public async findMultipleTags(tags: number[]) {
    return await this.tagsRepository.find({ where: { id: In(tags) } });
  }

  /**
   * Method to create tag to database
   */
  public async create(createTagDto: CreateTagDto) {
    let tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);
  }

  /*
   *Delete a tag
   *
   * */
  public async delete(id: number) {
    await this.tagsRepository.delete(id);
    return { deleted: true, id };
  }

  /**
   * Soft delete
   */
  public async softDelete(id: number) {
    await this.tagsRepository.softDelete(id);
    return { deleted: true, id };
  }
}
