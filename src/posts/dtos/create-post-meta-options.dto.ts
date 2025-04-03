import { IsOptional, IsString } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @IsOptional()
  @IsString()
  key: string;

  @IsOptional()
  value: any;
}
